import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit() {
    this.userService.findAllUsers().subscribe(
        (users: User[]) => {
          this.users = users;
        }
    );
  }

  deleteUser(delete_user) {
    return this.userService.deleteUser(delete_user._id).subscribe(
        () => this.route.navigate(['/userpage'])
    );
  }

}
