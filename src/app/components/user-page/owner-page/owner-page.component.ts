import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../../../models/restaurant.model.client';
import {SharedService} from '../../../services/shared.service';
import {RestaurantService} from '../../../services/restaurant.service.client';

@Component({
  selector: 'app-owner-page',
  templateUrl: './owner-page.component.html',
  styleUrls: ['./owner-page.component.css']
})
export class OwnerPageComponent implements OnInit {

  userId: String;
  restaurants: Restaurant[];

  constructor(private sharedService: SharedService,
              private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    console.log(this.userId);
    this.restaurantService.findRestaurantsByUser(this.userId).subscribe(
        (restaurants: Restaurant[]) => {
          this.restaurants = restaurants;
        });
  }

}
