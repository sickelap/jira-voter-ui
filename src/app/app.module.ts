import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { CountPipe } from '../pipes/count.pipe';
import { BoardComponent } from '../pages/board/board.component';
import { SprintComponent } from '../components/sprint/sprint.component';
import { IssueComponent } from '../components/issue/issue.component';
import { IssueDetailsComponent } from '../components/issue-details/issue-details.component';
import { LabelComponent } from '../components/label/label.component';
import { IssueDropdownComponent } from '../components/issue-dropdown/issue-dropdown.component';
import { JwtInterceptor } from '../services/jwt.interceptor';
import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { BacklogComponent } from '../components/backlog/backlog.component';
import { ChipComponent } from '../components/chip/chip.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppEffects } from '../store/effects';
import { boardReducer, uiReducer } from '../store/reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    BoardComponent,
    SprintComponent,
    IssueComponent,
    IssueDetailsComponent,
    BacklogComponent,
    ChipComponent,
    LabelComponent,
    CountPipe,
    IssueDropdownComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    OverlayModule,
    DragDropModule,
    SocketIoModule.forRoot({url: environment.ws}),
    StoreModule.forRoot({ui: uiReducer, board: boardReducer}, {}),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [IssueDropdownComponent]
})
export class AppModule {
}
