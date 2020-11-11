import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppActions } from './actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IssueDropdownService } from '../components/issue-dropdown/issue-dropdown.service';
import { of } from 'rxjs';
import { JiraService } from '../services/jira.service';

@Injectable()
export class AppEffects {
  openIssueContextMenu$ = createEffect(() => this.actions.pipe(
    ofType(AppActions.openIssueContextMenu),
    map(action => {
      const {event, sprints, issue, isBacklog} = action;
      this.contextMenu.open(event, sprints, issue, isBacklog);
    }),
    catchError(error => of(AppActions.error(error)))
  ), {dispatch: false});

  closeIssueContextMenu$ = createEffect(() => this.actions.pipe(
    ofType(AppActions.closeIssueContextMenu),
    map(() => this.contextMenu.close()),
    catchError(error => of(AppActions.error(error)))
  ), {dispatch: false});

  moveIssueToSprint$ = createEffect(() => this.actions.pipe(
    ofType(AppActions.moveIssue),
    switchMap(action => this.jira.moveIssueToSprint(action.issue, action.sprint, action.position)),
    map(result => AppActions.moveIssueSuccess(result)),
    catchError(error => of(AppActions.error(error)))
  ));

  error$ = createEffect(() => this.actions.pipe(
    ofType(AppActions.error),
    map(console.log)
  ), {dispatch: false});

  constructor(private actions: Actions,
              private contextMenu: IssueDropdownService,
              private jira: JiraService) {
  }
}
