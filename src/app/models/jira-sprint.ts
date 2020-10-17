import { JiraIssue } from './jira-issue';

export enum JiraSprintState {
  CLOSED = 'closed',
  ACTIVE = 'active'
}

export interface JiraSprint {
  id: number;
  self: string;
  state: string;
  name: string;
  startDate: string;
  endDate: string;
  activatedDate: string;
  originBoardId: number;
  goal?: string;
  issues?: JiraIssue[];
}

export interface JiraSprintListResponse {
  maxResults: number;
  startAt: number;
  isLast: boolean;
  values: JiraSprint[];
}

export interface JiraSprintIssueListResponse {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: any[];
}
