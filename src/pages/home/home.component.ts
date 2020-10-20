import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JiraBoard } from '../../models/jira-board';
import { JiraService } from '../../services/jira.service';

@Component({
  selector: 'pp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  boards: Observable<JiraBoard[]>;

  constructor(private jira: JiraService) { }

  ngOnInit(): void {
    this.boards = this.jira.getBoards();
  }
}
