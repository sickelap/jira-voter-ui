import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JiraBoard } from '../models/jira-board';
import { JiraService } from '../services/jira.service';
import { AuthService } from '../services/auth.service';
import { RoomService } from '../services/room.service';
import { JiraBacklog, JiraSprint } from '../models/jira-sprint';
import { environment } from '../../environments/environment';

@Component({
  selector: 'pp-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public board: JiraBoard;
  public sprints: JiraSprint[];
  public backlog: JiraBacklog;
  public sprintIssues: any;
  // @ts-ignore
  jiraFieldEstimate: environment.jiraFieldEstimate;

  constructor(private jira: JiraService, private auth: AuthService, private route: ActivatedRoute, private room: RoomService) {
    this.board = this.route.snapshot.data.board;
    this.sprints = this.route.snapshot.data.sprints;
    this.backlog = this.route.snapshot.data.backlog;
    this.sprintIssues = this.jira.getSprintIssues(this.board.id.toString(), {id: 1} as any);
  }

  ngOnInit(): void {
    this.room.join(this.route.snapshot.params.boardId, this.auth.username);
  }
}
