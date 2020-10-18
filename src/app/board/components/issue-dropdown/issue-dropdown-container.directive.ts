import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ppIssueDropdownContainer],[pp-issue-dropdown-container]'
})
export class IssueDropdownContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
