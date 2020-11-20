import { JiraBoard } from '../models/jira-board';
import { JiraBacklog, JiraSprint } from '../models/jira-sprint';

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
