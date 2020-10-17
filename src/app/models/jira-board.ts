import { JiraListResponse } from './jira-list-response';

export enum JiraBoardType {
  'SCRUM' = 'scrum',
  'KANBAN' = 'kanban'
}

export interface JiraBoard {
  id: number;
  self: string;
  name: string;
  type: JiraBoardType;
}

export interface JiraBoardListResponse extends JiraListResponse {
  values: JiraBoard[];
}
