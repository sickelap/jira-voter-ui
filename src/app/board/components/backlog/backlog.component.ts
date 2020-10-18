import { Component, Input } from '@angular/core';
import { JiraBacklog } from '../../../models/jira-sprint';

@Component({
  selector: 'pp-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent {
  @Input() backlog: JiraBacklog;
}
