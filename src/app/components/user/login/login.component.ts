import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  user: User;
  username: string;
  password: string;
  userType: string;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private router: Router, private sharedService: SharedService, private userService: UserService) { }

  ngOnInit() {}

  // login() {
  //
  //   // fetching data from loginForm
  //   this.username = this.loginForm.value.username;
  //   this.password = this.loginForm.value.password;
  //   console.log('username is : ' + this.username);
  //   //
  //   // const user = this.userService.findUserByCredentials(this.username, this.password);
  //   // if (user) {
  //   //   this.router.navigate(['/user', user._id]);
  //   // }
  //   this.userService.findUserByCredentials(this.username, this.password)
  //     .subscribe((user: User) => {
  //       if (user) {
  //         console.log(user);
  //         this.router.navigate(['/user', user._id ]);
  //       }
  //     });
  // }

  login() {

    // fetching data from loginForm
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.userType = this.loginForm.value.userType;
    console.log('username is : ' + this.username);
    console.log('password is : ' + this.password);
    console.log('userType is : ' + this.userType);
    // calling client side userservice to send login information
    this.userService.login(this.username, this.password)
      .subscribe(
        (data: any) => {
          this.sharedService.user = data;
          console.log('Current user : ' + this.sharedService.user);
          this.router.navigate(['/profile']); },
        (error: any) => {
          console.log(error);
          this.errorFlag = true;
        }
      );
  }

}
