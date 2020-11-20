import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { JiraIssue } from '../../models/jira-issue';
import { ISSUE_CONTEXT_MENU_DATA } from '../../app/tokens';
import { ComponentPortal } from '@angular/cdk/portal';
import { IssueDropdownComponent } from './issue-dropdown.component';
import { fromEvent, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { JiraSprint } from '../../models/jira-sprint';

@Injectable({
  providedIn: 'root'
})
export class IssueDropdownService {
  overlayRef: OverlayRef | null;
  sub: Subscription;
  issueContextMenu: ComponentPortal<IssueDropdownComponent>;

  constructor(private overlay: Overlay) {
  }

  open(event: MouseEvent, issue: JiraIssue, sprints: JiraSprint[]): void {
    const backlog = !issue.fields.sprint;
    event.preventDefault();
    this.close();
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
      providers: [{provide: ISSUE_CONTEXT_MENU_DATA, useValue: {sprints, issue, backlog}}]
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
      ).subscribe(() => this.close());
  }

  close(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
