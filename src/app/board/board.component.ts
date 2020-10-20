import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JiraBoard } from '../models/jira-board';
import { JiraService } from '../services/jira.service';
import { AuthService } from '../services/auth.service';
import { RoomService } from '../services/room.service';
import { JiraBacklog, JiraSprint } from '../models/jira-sprint';
import { JiraIssue } from '../models/jira-issue';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { fromEvent, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { IssueDropdownComponent } from './components/issue-dropdown/issue-dropdown.component';
import { ISSUE_CONTEXT_MENU_DATA } from '../tokens';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

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
  overlayRef: OverlayRef | null;
  sub: Subscription;
  issueContextMenu: ComponentPortal<IssueDropdownComponent>;

  constructor(
    private injector: Injector,
    private jira: JiraService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private room: RoomService,
    public overlay: Overlay,
  ) {
    this.board = this.route.snapshot.data.board;
    this.sprints = this.route.snapshot.data.sprints;
    this.backlog = this.route.snapshot.data.backlog;
    this.sprintIssues = this.jira.getSprintIssues(this.board.id.toString(), {id: 1} as any);
  }

  ngOnInit(): void {
    this.room.join(this.route.snapshot.params.boardId, this.auth.username);
  }

  openIssueContextMenu(event: MouseEvent, issue: JiraIssue, backlog = false): void {
    event.preventDefault();
    this.closeIssueContextMenu();
    const {x, y} = event;
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({x, y})
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    const injector = Injector.create({
      providers: [{provide: ISSUE_CONTEXT_MENU_DATA, useValue: {sprints: this.sprints, issue, backlog}}]
    });
    this.issueContextMenu = new ComponentPortal(IssueDropdownComponent, null, injector);
    this.overlayRef.attach(this.issueContextMenu);

    this.sub = fromEvent<MouseEvent>(window, 'click')
      .pipe(
        filter(evt => {
          const clickTarget = evt.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.closeIssueContextMenu());
  }

  closeIssueContextMenu(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  drop(event: CdkDragDrop<JiraIssue[], any>): void {
    console.log(event);
  }
}
