import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model.client';
import {UserService} from '../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../services/shared.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  userId: String;
  user: User;

  constructor(private userService: UserService,
              private activatedRouter: ActivatedRoute,
              private route: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    return this.userService.findUserById(this.userId).subscribe(
        (user: User) => {
          console.log('This is: ' + user.username);
          console.log('This is: ' + user._id);
          this.user = user;
        }
    );
  }
}
