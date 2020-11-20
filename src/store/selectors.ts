import { AppState } from './state';

export const getAllBoards = (state: AppState) => state.board.list;
export const getCurrentBoard = (state: AppState) => state.board.current;
export const getSprints = (state: AppState) => state.board.sprints;
export const getBacklog = (state: AppState) => state.board.backlog;
