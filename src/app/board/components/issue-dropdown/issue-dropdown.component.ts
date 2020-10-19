import { Component, Input } from '@angular/core';
import { JiraIssue } from '../../../models/jira-issue';

@Component({
  selector: 'pp-issue-dropdown',
  templateUrl: './issue-dropdown.component.html',
  styleUrls: ['./issue-dropdown.component.scss']
})
export class IssueDropdownComponent {
  @Input() issue: JiraIssue;
}
