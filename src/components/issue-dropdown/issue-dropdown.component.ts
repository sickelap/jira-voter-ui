import { Component, Inject } from '@angular/core';
import { ISSUE_CONTEXT_MENU_DATA, IssueContextMenuData } from '../../app/tokens';
import { JiraSprint } from '../../models/jira-sprint';
import { AppState } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { AppActions } from '../../store/actions';
import { MoveIssueDTO, MoveTo } from '../../models/jira-issue';

@Component({
  selector: 'pp-issue-dropdown',
  templateUrl: './issue-dropdown.component.html',
  styleUrls: ['./issue-dropdown.component.scss']
})
export class IssueDropdownComponent {
  TOP = MoveTo.TOP;
  BOTTOM = MoveTo.BOTTOM;

  constructor(@Inject(ISSUE_CONTEXT_MENU_DATA) public data: IssueContextMenuData, private store: Store<AppState>) {
  }

  get sprints(): JiraSprint[] {
    if (this.data.backlog) {
      return this.data.sprints;
    }
    return this.data.sprints.filter(sprint => sprint.id !== this.data.issue.fields.sprint.id);
  }

  moveIssue(sprint: JiraSprint | null, position: MoveTo): void {
    const move: MoveIssueDTO = {
      issue: this.data.issue,
      toSprint: sprint,
      toPosition: position
    };
    this.store.dispatch(AppActions.moveIssue(move));
    this.store.dispatch(AppActions.closeIssueContextMenu());
  }
}
