import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { JiraBoard } from '../../models/jira-board';
import { AppState, getAllBoards } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { AppActions } from '../../store/actions';

@Component({
  selector: 'pp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  boards$: Observable<JiraBoard[]>;

  constructor(store: Store<AppState>) {
    store.dispatch(AppActions.loadBoards());
    this.boards$ = store.select(getAllBoards);
  }
}
