import { JiraBoard } from '../models/jira-board';
import { JiraBacklog, JiraSprint } from '../models/jira-sprint';
import { createReducer, on } from '@ngrx/store';
import { AppActions } from './actions';

export interface AppState {
  board: JiraBoard;
  sprints: JiraSprint[],
  backlog: JiraBacklog;
}

export interface State {
  ui: {
    contextMenuVisible: boolean;
  };
}

export const initialState: State = {
  ui: {
    contextMenuVisible: false
  }
};


const uiReducer = createReducer(
  initialState.ui,
  on(AppActions.openIssueContextMenu, state => ({...state, contextMenuVisible: true })),
  on(AppActions.closeIssueContextMenu, state => ({...state, contextMenuVisible: false })),
);
