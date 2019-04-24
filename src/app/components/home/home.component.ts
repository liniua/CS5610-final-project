import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service.client';
import {SharedService} from '../../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

  zipcode: String;
  loggedin: boolean;

  constructor(private sharedService: SharedService, private userService: UserService, private route: Router) { }

  ngOnInit() {
    this.loggedin = Object.keys(this.sharedService.user).length !== 0;
    console.log('loggedin: ' + this.loggedin);
    if (this.loggedin) {
      document.getElementById('loginbtn').style.display = 'none';
      document.getElementById('logoutbtn').style.display = 'block';
    } else {
      document.getElementById('loginbtn').style.display = 'block';
    }
  }

  logout() {
    this.userService.logout()
        .subscribe(
            (data: any) => this.route.navigate([''])
        );
    this.sharedService.user = {};
  }

  searchByZipcode() {
    this.zipcode = this.searchForm.value.zipcode;
    console.log('the zipcode you are searching is');
    this.route.navigate(['userpage/' + this.zipcode + '/results']);
  }

}
