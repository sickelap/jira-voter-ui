import { InjectionToken } from '@angular/core';
import { JiraSprint } from './models/jira-sprint';
import { JiraIssue } from './models/jira-issue';

export interface IssueContextMenuData {
  sprints: JiraSprint[];
  issue: JiraIssue;
  backlog: boolean;
}

export const ISSUE_CONTEXT_MENU_DATA = new InjectionToken<IssueContextMenuData>('ISSUE_CONTEXT_MENU_DATA');
