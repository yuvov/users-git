import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `<img [src]="avatarUrl" [attr.height]="height" [attr.width]="width" >`
})
export class AvatarComponent  {
  @Input() avatarUrl: string;
  @Input() height = '50px';
  @Input() width = '50px';
}
