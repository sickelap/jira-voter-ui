import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JiraBacklog, JiraSprint } from '../../models/jira-sprint';
import { AppState, getBacklog, getSprints } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { AppActions } from '../../store/actions';
import { Observable } from 'rxjs';
import { JiraIssue } from '../../models/jira-issue';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'pp-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  public sprints$: Observable<JiraSprint[]>;
  public backlog$: Observable<JiraBacklog>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    const {boardId} = route.snapshot.params;
    store.dispatch(AppActions.initializeBoard({boardId}));
    this.sprints$ = store.select(getSprints);
    this.backlog$ = store.select(getBacklog);
  }

  drop(event: CdkDragDrop<JiraIssue[], any>): void {
    this.store.dispatch(AppActions.closeIssueContextMenu());
  }

  openIssueContextMenu(event: MouseEvent, issue: JiraIssue): void {
    this.store.dispatch(AppActions.openIssueContextMenu({event, issue}));
  }
}
