import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JiraBoard } from '../models/jira-board';
import { JiraService } from '../services/jira.service';
import { AuthService } from '../services/auth.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  public board: JiraBoard;
  public sprints: any;
  public backlog: any;
  public sprintIssues: any;

  constructor(private jira: JiraService, private auth: AuthService, private route: ActivatedRoute, private room: RoomService) {
    this.board = this.route.snapshot.data.board;
    this.sprints = this.route.snapshot.data.sprints;
    this.backlog = this.route.snapshot.data.backlog;
    this.sprintIssues = this.jira.getSprintIssues('1', {id: 1} as any);
  }

  ngOnInit(): void {
    this.room.join(this.route.snapshot.params.boardId, this.auth.username);
  }
}
