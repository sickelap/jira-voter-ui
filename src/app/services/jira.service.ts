import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { JiraIssue, JiraIssueListResponse } from '../models/jira-issue';
import { JiraSprint, JiraSprintIssueListResponse, JiraSprintListResponse } from '../models/jira-sprint';
import { JiraBoard, JiraBoardListResponse } from '../models/jira-board';

const issueFields = [
  'id,key,summary,description,resolution,assignee,issuetype,reporter',
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
      map(response => response.issues)
    );
  }

  getBoardSprints(boardId: string, includeIssues = false): Observable<any> {
    const url = `${environment.apiServer}/api/v1/board/${boardId}/sprint`;
    const params = {
      state: 'active,future'
    };
    const result = this.http.get<JiraSprintListResponse>(url, {params}).pipe(
      map(response => response.values)
    );
    if (includeIssues) {
      return result.pipe(
        switchMap(sprints => sprints),
        map(sprint => this.getSprintIssues(boardId, sprint).pipe(
          map(issues => ({...sprint, issues}))
        )),
        mergeMap(a => a)
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
      fields: issueFields
    };
    return this.http.get<JiraSprintIssueListResponse>(url, {params}).pipe(
      map(response => response.issues)
    );
  }
}