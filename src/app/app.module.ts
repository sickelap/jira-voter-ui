import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';
import { BoardComponent } from './board/board.component';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { SprintComponent } from './board/components/sprint/sprint.component';
import { IssueComponent } from './board/components/issue/issue.component';
import { IssueDetailsComponent } from './board/components/issue-details/issue-details.component';
import { AuiBadgeComponent } from './board/components/aui-badge/aui-badge.component';
import { BacklogComponent } from './board/components/backlog/backlog.component';
import { ChipComponent } from './board/components/chip/chip.component';
import { LabelComponent } from './board/components/label/label.component';
import { CountPipe } from './pipes/count.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { IssueDropdownComponent } from './board/components/issue-dropdown/issue-dropdown.component';

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
    AuiBadgeComponent,
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
