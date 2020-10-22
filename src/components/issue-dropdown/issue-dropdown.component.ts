import { Component, Inject } from '@angular/core';
import { ISSUE_CONTEXT_MENU_DATA, IssueContextMenuData } from '../../app/tokens';
import { JiraSprint } from '../../models/jira-sprint';
import { AppState } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { moveIssue } from '../../store/actions';

@Component({
  selector: 'pp-issue-dropdown',
  templateUrl: './issue-dropdown.component.html',
  styleUrls: ['./issue-dropdown.component.scss']
})
export class IssueDropdownComponent {
  constructor(@Inject(ISSUE_CONTEXT_MENU_DATA) public data: IssueContextMenuData, private store: Store<AppState>) {
    console.log(data);
  }

  get sprints(): JiraSprint[] {
    if (this.data.backlog) {
      return this.data.sprints;
    }
    return this.data.sprints.filter(sprint => sprint.id !== this.data.issue.fields.sprint.id);
  }

  moveIssue(sprint: JiraSprint | null, position = 0): void {
    this.store.dispatch(moveIssue({issue: this.data.issue, sprint, position}));
  }
}
