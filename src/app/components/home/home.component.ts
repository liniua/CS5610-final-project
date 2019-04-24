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
  loggedout = true;

  constructor(private sharedService: SharedService, private userService: UserService, private route: Router) { }

  ngOnInit() {
    this.loggedin = Object.keys(this.sharedService.user).length !== 0;
    this.loggedout = !this.loggedin;
  }

}
