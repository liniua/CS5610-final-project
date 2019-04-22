import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('f') profileForm: NgForm;

  username: String;
  firstName: String;
  lastName: String;
  email: String;
  user = {};
  userId: String;

  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService,
              private activatedRouter: ActivatedRoute,
              private route: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    this.user = this.sharedService.user;
    // this.userService.findUserById(this.userId).subscribe(
    //   (user: User) => {
    //     // console.log('This is: ' + user['username']);
    //     // console.log('This is: ' + user['_id']);
    //     this.user = user;
    //   }
    // );
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => this.route.navigate(['/login'])
      );
  }


  updateUser() {
    this.errorFlag = false;
    if (this.user['username'] === undefined) {
      this.errorFlag = true;
    }
    return this.userService.updateUser(this.user).subscribe(
        (new_user: any) => {
          //this.user = new_user;
          console.log(new_user);
          alert('update succeed!');
          //this.route.navigate(['/profile']);
        }
      );
  }
  deleteUser(delete_user) {
    return this.userService.deleteUser(delete_user['_id']).subscribe(
      () => this.route.navigate(['/login'])
    );
  }
}
