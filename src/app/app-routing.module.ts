import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {BlocksComponent} from './git-users/blocks/blocks.component';
import {TableComponent} from './git-users/table/table.component';
import {UserDetailComponent} from './git-users/user-detail/user-detail.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/blocks', pathMatch: 'full' },
  {path: 'blocks', component: BlocksComponent, canActivate: [AuthGuard]},
  {path: 'table', component: TableComponent , canActivate: [AuthGuard]},
  {path: 'table/detail/:username', component: UserDetailComponent, canActivate: [AuthGuard]},
  {path: 'blocks/detail/:username', component: UserDetailComponent, canActivate: [AuthGuard]},
  {path: 'login', component: AuthComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
