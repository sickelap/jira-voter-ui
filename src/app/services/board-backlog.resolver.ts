import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JiraIssue } from '../models/jira-issue';
import { JiraService } from './jira.service';

@Injectable({
  providedIn: 'root'
})
export class BoardBacklogResolver implements Resolve<JiraIssue[]> {
  constructor(private jira: JiraService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JiraIssue[]> {
    return this.jira.getBoardBacklogIssues(route.params.boardId);
  }
}
