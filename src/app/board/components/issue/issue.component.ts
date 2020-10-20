import { Component, HostListener, Input } from '@angular/core';
import { JiraIssue } from '../../../models/jira-issue';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'pp-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent {
  @Input() issue: JiraIssue;
  active = false;
  estimate = environment.jiraFieldEstimate;

  @HostListener('contextmenu')
  onContextMenu(): void {
    this.active = true;
  }

  @HostListener('window:click')
  onWindowContextMenu(): void {
    this.active = false;
  }
}
