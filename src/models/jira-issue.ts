import { JiraSprint } from './jira-sprint';

export interface JiraIssueType {
  id: string;
  description: string;
  iconUrl: string;
  name: string; // Story
  subtask: boolean;
}

export interface JiraIssueResolution {
  id: string;
  description: string;
  name: string; // e.g. Done
}

export interface JiraIssueStatus {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  statusCategory: {
    id: number,
    key: string;
    colorName: string; // e.g. 'yellow',
    name: string; // e.g. 'In Progress'
  };
}

export interface JiraIssueEpic {
  id: number;
  key: string;
  name: string;
  summary: string;
  color: {
    key: string; // e.g. 'color_1'
  };
  done: boolean;
}

export interface JiraIssuePriority {
  id: string;
  iconUrl: string;
  name: string; // e.g. 'Medium',
}

export interface JiraUser {
  name: string;
  key: string;
  emailAddress: string;
  avatarUrls: {
    '48x48': string;
    '24x24': string;
    '16x16': string;
    '32x32': string;
  };
  displayName: string;
  active: boolean;
  timeZone: string; // e.g. Europe/London
}

export interface JiraIssue {
  id: string;
  key: string;
  expand: string;
  fields: {
    summary: string;
    issuetype: JiraIssueType;
    description: string;
    resolution: JiraIssueResolution;
    reporter: JiraUser;
    assignee: JiraUser;
    epic: JiraIssueEpic;
    priority: JiraIssuePriority;
    status: JiraIssueStatus;
    sprint: JiraSprint;
  };
}

export interface JiraIssueListResponse {
  expand: string;
  maxResults: number;
  startAt: number;
  total: number;
  issues: JiraIssue[];
}

export enum MoveTo {
  TOP, BOTTOM
}
