import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit {

  @ViewChild('f') searchForm: NgForm;
  zipcode: String;
  restaurantName: String;

  constructor() { }

  ngOnInit() {}


  searchByZipcode() {
    this.zipcode = this.searchForm.value.zipcode;
  }


  searchByRestaurantName() {
    this.restaurantName = this.searchForm.value.restaurantName;
  }
}
