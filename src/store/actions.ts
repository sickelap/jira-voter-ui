import { createAction, props } from '@ngrx/store';
import { JiraSprint } from '../models/jira-sprint';
import { JiraIssue } from '../models/jira-issue';

export const moveIssue = createAction(
  '[Jira] Move Issue',
  props<{issue: JiraIssue, sprint: JiraSprint, position: number}>()
);

export const openIssueContextMenu = createAction(
  '[Voter] Open ContextMenu',
  props<{issue: JiraIssue}>()
);

export const closeIssueContextMenu = createAction(
  '[Voter] Close ContextMenu',
  props<{issue: JiraIssue}>()
);
