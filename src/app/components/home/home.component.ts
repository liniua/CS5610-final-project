import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

  zipcode: String;

  constructor(private route: Router) { }

  ngOnInit() {
  }

  searchByZipcode() {
    this.zipcode = this.searchForm.value.zipcode;
    console.log('the zipcode you are searching is');
    this.route.navigate(['userpage/' + this.zipcode + '/results']);
  }

}
