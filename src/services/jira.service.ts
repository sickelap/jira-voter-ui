import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JiraIssue, JiraIssueListResponse, MoveIssueDTO, MoveTo } from '../models/jira-issue';
import { JiraSprint, JiraSprintIssueListResponse, JiraSprintListResponse } from '../models/jira-sprint';
import { JiraBoard, JiraBoardListResponse } from '../models/jira-board';
import { environment } from '../environments/environment';

const issueFields = [
  'id',
  'key',
  'summary',
  'description',
  'resolution',
  'assignee',
  'issuetype',
  'reporter',
  'epic',
  'priority',
  'status',
  'sprint',
  environment.jiraFieldEstimate
].join(',');

@Injectable({
  providedIn: 'root'
})
export class JiraService {
  constructor(private http: HttpClient) {
  }

  getBoardBacklogIssues(boardId: string): Observable<JiraIssue[]> {
    const url = `${environment.apiServer}/jira/rest/agile/1.0/board/${boardId}/issue`;
    const params = {
      fields: issueFields,
      jql: 'issuetype not in(Sub-task,Task)'
    };
    return this.http.get<JiraIssueListResponse>(url, {params}).pipe(
      map(response => response.issues.filter(issue => !issue.fields.sprint && !issue.fields.resolution))
    );
  }

  getBoardSprints(boardId: string, includeIssues = false): Observable<JiraSprint[]> {
    const url = `${environment.apiServer}/jira/rest/agile/1.0/board/${boardId}/sprint`;
    const params = {
      state: 'active,future'
    };
    const result = this.http.get<JiraSprintListResponse>(url, {params}).pipe(
      map(response => response.values)
    );
    const enrichWithIssues = sprint => this.getSprintIssues(boardId, sprint).pipe(
      map(issues => ({...sprint, issues}))
    );
    if (includeIssues) {
      return result.pipe(
        switchMap(sprints => combineLatest(sprints.map(enrichWithIssues)))
      );
    }
    return result;
  }

  getBoards(): Observable<JiraBoard[]> {
    const url = `${environment.apiServer}/jira/rest/agile/1.0/board`;
    return this.http.get<JiraBoardListResponse>(url).pipe(
      map(response => response.values)
    );
  }

  getBoard(boardId: string): Observable<JiraBoard> {
    const url = `${environment.apiServer}/jira/rest/agile/1.0/board/${boardId}`;
    return this.http.get<JiraBoard>(url);
  }

  getSprintIssues(boardId: string, sprint: JiraSprint): Observable<JiraIssue[]> {
    const url = `${environment.apiServer}/jira/rest/agile/1.0/board/${boardId}/sprint/${sprint.id}/issue`;
    const params = {
      fields: issueFields,
      jql: 'issuetype not in(Sub-task,Task)'
    };
    return this.http.get<JiraSprintIssueListResponse>(url, {params}).pipe(
      map(response => response.issues)
    );
  }

  moveIssueToSprint(move: MoveIssueDTO): Observable<MoveIssueDTO> {
    const url = move.toSprint
      ? `${environment.apiServer}/jira/rest/agile/1.0/sprint/${move.toSprint.id}/issue`
      : `${environment.apiServer}/jira/rest/agile/1.0/backlog/issue`;
    const payload = {
      issues: [move.issue.key]
    };
    // if (position === MoveTo.BOTTOM) {
    //   payload = {...payload, rankAfterIssue: sprint.issues[sprint.issues.length - 1].key};
    // } else {
    //   payload = {...payload, rankBeforeIssue: sprint.issues[0].key};
    // }
    return this.http.post(url, payload).pipe(map(() => move));
  }
}
