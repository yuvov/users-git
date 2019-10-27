import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import {AvatarModule} from '../avatar/avatar.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    AvatarModule
  ],
  exports: [NavbarComponent]
})
export class LayoutModule { }
