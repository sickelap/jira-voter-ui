import { createReducer, on } from '@ngrx/store';
import { AppActions } from './actions';
import { BoardState, initialState, UIState } from './state';

export function uiReducer(state: UIState, action): UIState {
  return createReducer(
    initialState.ui,
    on(AppActions.openIssueContextMenu, st => ({...st, contextMenuVisible: true})),
    on(AppActions.closeIssueContextMenu, st => ({...st, contextMenuVisible: false})),
  )(state, action);
}

export function boardReducer(state: BoardState, action): BoardState {
  return createReducer(
    initialState.board,
    on(AppActions.boardsLoaded, (st, {boards}) => ({...st, list: boards})),
    on(AppActions.boardLoaded, (st, {board}) => ({...st, current: board})),
    on(AppActions.sprintsLoaded, (st, {sprints}) => ({...st, sprints})),
    on(AppActions.backlogLoaded, (st, {backlog}) => ({...st, backlog})),
  )(state, action);
}
