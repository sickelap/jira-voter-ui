import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppActions } from './actions';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { IssueDropdownService } from '../components/issue-dropdown/issue-dropdown.service';
import { concat, of } from 'rxjs';
import { JiraService } from '../services/jira.service';
import { Store } from '@ngrx/store';
import { getCurrentBoard, getSprints } from './selectors';

@Injectable()
export class AppEffects {
  openIssueContextMenu$ = createEffect(() => this.actions.pipe(
    ofType(AppActions.openIssueContextMenu),
    withLatestFrom(this.store.select(getSprints)),
    map(([action, sprints]) => this.contextMenu.open(action.event, action.issue, sprints)),
    catchError(error => of(AppActions.error(error)))
  ), {dispatch: false});

  closeIssueContextMenu$ = createEffect(() => this.actions.pipe(
    ofType(AppActions.closeIssueContextMenu),
    map(() => this.contextMenu.close()),
    catchError(error => of(AppActions.error(error)))
  ), {dispatch: false});

  moveIssueToSprint$ = createEffect(() => this.actions.pipe(
    ofType(AppActions.moveIssue),
    switchMap(action => this.jira.moveIssueToSprint(action)),
    map(result => AppActions.moveIssueSuccess(result)),
    catchError(error => of(AppActions.error(error)))
  ));

  moveIssueSuccess$ = createEffect(() => this.actions.pipe(
    ofType(AppActions.moveIssueSuccess),
    withLatestFrom(this.store.select(getCurrentBoard)),
    switchMap(([_, board]) => concat([
      AppActions.loadSprints({boardId: board.id.toString()}),
      AppActions.loadBacklog({boardId: board.id.toString()})
    ]))
  ));

  error$ = createEffect(() => this.actions.pipe(
    ofType(AppActions.error),
    map(console.log)
  ), {dispatch: false});

  loadAllBoards$ = createEffect(() => this.actions.pipe(
    ofType(AppActions.loadBoards),
    switchMap(() => this.jira.getBoards()),
    map(boards => AppActions.boardsLoaded({boards}))
  ));

  initializeBoard$ = createEffect(() => this.actions.pipe(
    ofType(AppActions.initializeBoard),
    switchMap(action => concat([
      AppActions.loadBoard(action),
      AppActions.loadSprints(action),
      AppActions.loadBacklog(action),
    ]))
  ));

  loadBoard$ = createEffect(() => this.actions.pipe(
    ofType(AppActions.loadBoard),
    switchMap(action => this.jira.getBoard(action.boardId)),
    map(board => AppActions.boardLoaded({board}))
  ));

  loadSprints$ = createEffect(() => this.actions.pipe(
    ofType(AppActions.loadSprints),
    switchMap(action => this.jira.getBoardSprints(action.boardId, true)),
    map(sprints => AppActions.sprintsLoaded({sprints}))
  ));

  loadBacklog$ = createEffect(() => this.actions.pipe(
    ofType(AppActions.loadBacklog),
    switchMap(action => this.jira.getBoardBacklogIssues(action.boardId)),
    map(backlog => AppActions.backlogLoaded({backlog}))
  ));

  constructor(private actions: Actions,
              private store: Store,
              private contextMenu: IssueDropdownService,
              private jira: JiraService) {
  }
}
