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
    SocketIoModule.forRoot({url: environment.ws})
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
export class AppModule { }
