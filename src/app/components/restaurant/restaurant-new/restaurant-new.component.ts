import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RestaurantService} from '../../../services/restaurant.service.client';
import {Restaurant} from '../../../models/restaurant.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-restaurant-new',
  templateUrl: './restaurant-new.component.html',
  styleUrls: ['./restaurant-new.component.css']
})
export class RestaurantNewComponent implements OnInit {

  @ViewChild('f') restForm: NgForm;
  userId: String;
  restaurants: Restaurant[];
  restname: String;
  address: String;
  zipcode: String;
  description: String;

  constructor(private restaurantService: RestaurantService, private activatedRoute: ActivatedRoute, private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    this.restaurantService.findRestaurantsByUser(this.userId).subscribe(
        (restaurants: Restaurant[]) => {
          this.restaurants = restaurants;
        });
  }

  createRestaurant() {
    this.restname = this.restForm.value.restname;
    this.address = this.restForm.value.address;
    this.zipcode = this.restForm.value.zipcode;
    this.description = this.restForm.value.description;
    const new_restaurant = new Restaurant(undefined, this.restname, this.userId, this.description, this.address, this.zipcode);

    console.log('new restaurant: ');
    console.log(new_restaurant.name);
    console.log(new_restaurant.ownerId);
    this.restaurantService.createRestaurant(this.userId, new_restaurant).subscribe(
        (restaurant: Restaurant) => {
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        }
    );
  }
}
