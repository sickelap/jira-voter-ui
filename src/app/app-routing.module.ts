import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './services/auth.guard';
import { BoardComponent } from './board/board.component';
import { BoardResolver } from './services/board.resolver';
import { BoardSprintsResolver } from './services/board-sprints.resolver';
import { BoardBacklogResolver } from './services/board-backlog.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'board/:boardId',
    component: BoardComponent,
    resolve: { board: BoardResolver, sprints: BoardSprintsResolver, backlog: BoardBacklogResolver }
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
