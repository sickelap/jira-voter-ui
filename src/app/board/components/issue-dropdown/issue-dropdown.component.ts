import { Component, Input, OnInit } from '@angular/core';
import { JiraIssue } from '../../../models/jira-issue';

@Component({
  selector: 'pp-issue-dropdown',
  templateUrl: './issue-dropdown.component.html',
  styleUrls: ['./issue-dropdown.component.scss']
})
export class IssueDropdownComponent implements OnInit {
  @Input() issue: JiraIssue;
  @Input() event: MouseEvent;
  style = '';

  ngOnInit(): void {
    this.style = `left:${this.event.pageX}px;top:${this.event.pageY}px;`;
  }
}
