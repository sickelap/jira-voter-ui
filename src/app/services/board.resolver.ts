import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { JiraBoard } from '../models/jira-board';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JiraService } from './jira.service';

@Injectable({
  providedIn: 'root'
})
export class BoardResolver implements Resolve<JiraBoard> {
  constructor(private jira: JiraService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JiraBoard> {
    return this.jira.getBoard(route.params.boardId);
  }
}
