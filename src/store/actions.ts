import { createAction, props } from '@ngrx/store';
import { JiraBacklog, JiraSprint } from '../models/jira-sprint';
import { JiraIssue, MoveIssueDTO } from '../models/jira-issue';
import { JiraBoard } from '../models/jira-board';

export class AppActions {
  static moveIssue = createAction('[Jira] Move Issue', props<MoveIssueDTO>());

  static moveIssueSuccess = createAction('[Jira] Move Issue Success', props<MoveIssueDTO>());

  static openIssueContextMenu = createAction('[Voter] Open ContextMenu',
    props<{ event: MouseEvent, issue: JiraIssue }>());

  static error = createAction('[Voter] Error', props<{ error: string }>());

  static closeIssueContextMenu = createAction('[Voter] Close ContextMenu');

  static initializeBoard = createAction('[Voter] Initialize Board', props<{ boardId: string }>());

  static loadBoards = createAction('[Voter] Load All Boards');

  static boardsLoaded = createAction('[Voter] All Boards Loaded', props<{boards: JiraBoard[]}>());

  static loadBoard = createAction('[Voter] Load Board', props<{ boardId: string }>());

  static boardLoaded = createAction('[Voter] Board Loaded', props<{ board: JiraBoard }>());

  static loadSprints = createAction('[Voter] Load Sprints', props<{ boardId: string }>());

  static sprintsLoaded = createAction('[Voter] Sprints Loaded', props<{ sprints: JiraSprint[] }>());

  static loadBacklog = createAction('[Voter] Load Backlog', props<{ boardId: string }>());

  static backlogLoaded = createAction('[Voter] Backlog Loaded', props<{ backlog: JiraBacklog }>());
}
