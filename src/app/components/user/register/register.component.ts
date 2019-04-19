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
  user: User;
  error: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }

  register() {

    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.vpassword = this.registerForm.value.vpassword;

    if (this.password === this.vpassword) {
      // this.userService.createUser(this.username, this.password)
      //   .subscribe(
      //     (user: User) => {
      //       this.router.navigate(['/user', user._id ]);
      //     },
      //     (error: any) => {
      //             console.log(error);
      //             this.error = error._body;
      //           }
      //   );
      this.userService.register(this.username, this.password)
        .subscribe(
          (data: any) => {
            this.user = data;
            this.router.navigate(['/profile']);
          },
          (error: any) => {
            this.error = error._body;
          }
        );

      console.log('Add new user: ' + this.user.username);
    } else {

        this.error = 'Passwords do not match!';
      }
  }

}
