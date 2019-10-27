import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs';

import {UserGitService} from '../user-git.service';
import {UserGit} from '../user-git';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html'
})
export class BlocksComponent {

  users$: Observable<UserGit[]>;

  constructor(private userService: UserGitService,
              private router: Router,
              private route: ActivatedRoute) { }

  onSearch(value) {
    this.users$ = this.userService.getSearchUsers(value);
  }

  onSelect(user: UserGit){
    this.router.navigate(['detail', user.login], {relativeTo: this.route});
  }


}
