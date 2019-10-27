import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocksComponent } from './blocks/blocks.component';
import { TableComponent } from './table/table.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {SearchModule} from '../ui/search/search.module';
import {AvatarModule} from '../ui/avatar/avatar.module';

@NgModule({
  declarations: [BlocksComponent, TableComponent, UserDetailComponent],
  imports: [
    CommonModule,
    SearchModule,
    AvatarModule
  ],
  exports: [BlocksComponent, TableComponent, UserDetailComponent]
})
export class GitUsersModule { }
