import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JiraBoard } from '../../models/jira-board';
import { JiraBacklog, JiraSprint } from '../../models/jira-sprint';
import { JiraIssue } from '../../models/jira-issue';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AppState } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { AppActions } from '../../store/actions';

@Component({
  selector: 'pp-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  public board: JiraBoard;
  public sprints: JiraSprint[];
  public backlog: JiraBacklog;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.board = this.route.snapshot.data.board;
    this.sprints = this.route.snapshot.data.sprints;
    this.backlog = this.route.snapshot.data.backlog;
  }

  drop(event: CdkDragDrop<JiraIssue[], any>): void {
    this.store.dispatch(AppActions.closeIssueContextMenu());
  }

  openIssueContextMenu(event: MouseEvent, issue: JiraIssue, isBacklog = false): void {
    const payload = {event, sprints: this.sprints, issue, isBacklog};
    this.store.dispatch(AppActions.openIssueContextMenu(payload));
  }
}
