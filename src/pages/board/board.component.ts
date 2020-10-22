import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JiraBoard } from '../../models/jira-board';
import { JiraService } from '../../services/jira.service';
import { AuthService } from '../../services/auth.service';
import { JiraBacklog, JiraSprint } from '../../models/jira-sprint';
import { JiraIssue } from '../../models/jira-issue';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'pp-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  public board: JiraBoard;
  public sprints: JiraSprint[];
  public backlog: JiraBacklog;
  public sprintIssues: any;

  constructor(
    private injector: Injector,
    private jira: JiraService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.board = this.route.snapshot.data.board;
    this.sprints = this.route.snapshot.data.sprints;
    this.backlog = this.route.snapshot.data.backlog;
    this.sprintIssues = this.jira.getSprintIssues(this.board.id.toString(), {id: 1} as any);
  }

  drop(event: CdkDragDrop<JiraIssue[], any>): void {
    console.log(event);
  }
}
