import { JiraBoard } from '../models/jira-board';
import { JiraBacklog, JiraSprint } from '../models/jira-sprint';
import { createReducer, on } from '@ngrx/store';
import { AppActions } from './actions';

export interface UIState {
  contextMenuVisible: boolean;
}

export interface BoardState {
  list: JiraBoard[];
  current: JiraBoard;
  sprints: JiraSprint[];
  backlog: JiraBacklog;
}

export interface AppState {
  ui: UIState;
  board: BoardState;
}

export const initialState: AppState = {
  ui: {
    contextMenuVisible: false
  },
  board: {
    list: [],
    current: null,
    sprints: [],
    backlog: null
  },
};

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

export const getAllBoards = (state: AppState) => state.board.list;
export const getCurrentBoard = (state: AppState) => state.board.current;
export const getSprints = (state: AppState) => state.board.sprints;
export const getBacklog = (state: AppState) => state.board.backlog;
