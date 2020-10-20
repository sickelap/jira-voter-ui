import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JiraSprint } from '../models/jira-sprint';
import { JiraService } from './jira.service';

@Injectable({
  providedIn: 'root'
})
export class BoardSprintsResolver implements Resolve<JiraSprint[]> {
  constructor(private jira: JiraService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JiraSprint[]> {
    return this.jira.getBoardSprints(route.params.boardId, true);
  }
}
