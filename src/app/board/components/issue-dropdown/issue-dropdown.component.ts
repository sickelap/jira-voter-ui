import { Component, Inject } from '@angular/core';
import { ISSUE_CONTEXT_MENU_DATA, IssueContextMenuData } from '../../../tokens';
import { JiraSprint } from '../../../models/jira-sprint';

@Component({
  selector: 'pp-issue-dropdown',
  templateUrl: './issue-dropdown.component.html',
  styleUrls: ['./issue-dropdown.component.scss']
})
export class IssueDropdownComponent {
  constructor(@Inject(ISSUE_CONTEXT_MENU_DATA) public data: IssueContextMenuData) {
    console.log(data);
  }

  get sprints(): JiraSprint[] {
    if (this.data.backlog) {
      return this.data.sprints;
    }
    return this.data.sprints.filter(sprint => sprint.id !== this.data.issue.fields.sprint.id);
  }
}
