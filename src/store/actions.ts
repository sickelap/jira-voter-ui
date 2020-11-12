import { createAction, props } from '@ngrx/store';
import { JiraSprint } from '../models/jira-sprint';
import { JiraIssue, MoveIssueDTO } from '../models/jira-issue';

export class AppActions {
  static moveIssue = createAction('[Jira] Move Issue', props<MoveIssueDTO>());

  static moveIssueSuccess = createAction('[Jira] Move Issue Success', props<MoveIssueDTO>());

  static openIssueContextMenu = createAction('[Voter] Open ContextMenu',
    props<{event: MouseEvent, sprints: JiraSprint[], issue: JiraIssue, isBacklog: boolean}>());

  static error = createAction('[Voter] Error', props<{error: string}>());

  static closeIssueContextMenu = createAction('[Voter] Close ContextMenu');
}
