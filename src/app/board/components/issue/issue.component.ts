import {
  Component,
  ComponentRef, ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { JiraIssue } from '../../../models/jira-issue';
import { environment } from '../../../../environments/environment';
import { IssueDropdownComponent } from '../issue-dropdown/issue-dropdown.component';
import { DomService } from '../../../services/dom.service';

@Component({
  selector: 'pp-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent {
  @Input() issue: JiraIssue;
  dropdown: ComponentRef<IssueDropdownComponent>;
  estimate = environment.jiraFieldEstimate;

  constructor(private dom: DomService, private elRef: ElementRef) {}

  destroyDropdown(): void {
    if (this.dropdown) {
      this.dropdown.destroy();
    }
  }

  @HostListener('window:click')
  onWindowClick(): void {
    this.destroyDropdown();
  }

  @HostListener('window:contextmenu', ['$event'])
  onRightClick(event: MouseEvent): void {
    console.log(this.elRef.nativeElement === event.target);
    event.preventDefault();
    this.destroyDropdown();
    this.dropdown = this.dom.createComponent(IssueDropdownComponent);
    this.dropdown.instance.issue = this.issue;
    this.dropdown.instance.event = event;
    this.dom.attachComponent(this.dropdown, document.body);
  }
}
