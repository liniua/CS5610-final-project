import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Restaurant} from '../../../models/restaurant.model.client';
import {RestaurantService} from '../../../services/restaurant.service.client';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit {

  @ViewChild('f') searchForm: NgForm;
  @ViewChild('g') reviewForm: NgForm;
  zipcode: String;
  restaurantName: String;

  constructor(private route: Router, private restaurantService: RestaurantService) { }

  ngOnInit() {}


  searchByZipcode() {
    this.zipcode = this.searchForm.value.zipcode;
    this.route.navigate(['userpage/' + this.zipcode + '/results']);
  }


  searchByRestaurantName() {
    this.restaurantName = this.reviewForm.value.restaurantName;
    this.restaurantService.findRestaurantByName(this.restaurantName).subscribe(
        (restaurant: Restaurant) => {
          this.route.navigate(['/userpage/' + restaurant._id + '/show']);
        }
    );
  }
}
