import { Component, Input } from '@angular/core';
import { JiraIssue } from '../../../models/jira-issue';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'pp-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent {
  @Input() issue: JiraIssue;
  estimate = environment.jiraFieldEstimate;
}
