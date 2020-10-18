import { Component, Input } from '@angular/core';
import { JiraSprint } from '../../../models/jira-sprint';

@Component({
  selector: 'pp-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent {
  @Input() sprint: JiraSprint;
}
