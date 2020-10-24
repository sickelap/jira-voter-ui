import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppActions } from './actions';
import { catchError, map } from 'rxjs/operators';
import { IssueDropdownService } from '../components/issue-dropdown/issue-dropdown.service';
import { of } from 'rxjs';

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

  constructor(private actions: Actions, private contextMenu: IssueDropdownService) {
  }
}
