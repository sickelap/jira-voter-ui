import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JiraIssue, JiraIssueListResponse } from '../models/jira-issue';
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
    const url = `${environment.apiServer}/api/v1/board/${boardId}/issue`;
    const params = {
      fields: issueFields
    };
    return this.http.get<JiraIssueListResponse>(url, {params}).pipe(
      map(response => response.issues.filter(issue => !issue.fields.sprint && !issue.fields.resolution))
    );
  }

  getBoardSprints(boardId: string, includeIssues = false): Observable<JiraSprint[]> {
    const url = `${environment.apiServer}/api/v1/board/${boardId}/sprint`;
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
    const url = `${environment.apiServer}/api/v1/board`;
    return this.http.get<JiraBoardListResponse>(url).pipe(
      map(response => response.values)
    );
  }

  getBoard(boardId: string): Observable<JiraBoard> {
    const url = `${environment.apiServer}/api/v1/board/${boardId}`;
    return this.http.get<JiraBoard>(url);
  }

  getSprintIssues(boardId: string, sprint: JiraSprint): Observable<JiraIssue[]> {
    const url = `${environment.apiServer}/api/v1/board/${boardId}/sprint/${sprint.id}/issue`;
    const params = {
      fields: issueFields,
      jql: 'issuetype not in(Sub-task, Task)'
    };
    return this.http.get<JiraSprintIssueListResponse>(url, {params}).pipe(
      map(response => response.issues)
    );
  }
}
