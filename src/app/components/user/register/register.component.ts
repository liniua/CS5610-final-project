import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;

  // properties
  username: string;
  password: string;
  vpassword: string;
  userType: string;
  user: User;
  error: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }

  register() {

    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.vpassword = this.registerForm.value.vpassword;
    this.userType = this.registerForm.value.userType;
    console.log('username is : ' + this.username);
    console.log('password is : ' + this.password);
    console.log('userType is : ' + this.userType);
    if (this.password === this.vpassword) {
      this.userService.register(this.username, this.password, this.userType)
        .subscribe(
          (data: any) => {
            this.user = data;
            //console.log(this.user);
            this.router.navigate(['/profile']);
          },
          (error: any) => {
            this.error = error._body;
          }
        );

      //console.log('Add new user: ' + this.user['username']);
    } else {

        this.error = 'Passwords do not match!';
      }
  }

}
