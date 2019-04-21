import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RestaurantService} from '../../../services/restaurant.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Restaurant} from '../../../models/restaurant.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.css']
})
export class RestaurantEditComponent implements OnInit {

  @ViewChild('f') restForm: NgForm;
  rid: String;
  userId: String;
  restaurant: Restaurant;
  restaurants: Restaurant[];
  constructor(private restaurantService: RestaurantService, private activatedRoute: ActivatedRoute, private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    console.log(this.userId);
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.rid = params['rid'];
        console.log(this.rid);
      });
    this.restaurantService.findRestaurantsByUser(this.userId).subscribe(
      (restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
      });
    console.log(this.restaurants);
    this.restaurantService.findRestaurantById(this.rid).subscribe(
      (restaurant: Restaurant) => {
        console.log(restaurant);
        this.restaurant = restaurant;
      }
    );
    console.log(this.restaurant);
  }

  updateRestaurant() {
    if (this.restForm.value.restname === '') {
      alert('Please input new restaurant name');
      return;
    }
    this.restaurant.name = this.restForm.value.name;
    this.restaurant.description = this.restForm.value.description;
    this.restaurant.address = this.restForm.value.address;
    this.restaurant.zipcode = this.restForm.value.zipcode;
    this.restaurantService.updateRestaurant(this.userId, this.rid, this.restaurant).subscribe(
      (restaurant: Restaurant) => {
        this.restaurant = restaurant;
      }
    );
  }
  deleteRestaurant() {
    console.log(this.rid);
    this.restaurantService.deleteRestaurant(this.userId, this.rid).subscribe(
      () => this.router.navigate(['../'], {relativeTo: this.activatedRoute}));
  }

}
