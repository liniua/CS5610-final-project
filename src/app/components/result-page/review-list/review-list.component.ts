import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {YelpServiceClient} from '../../../services/yelp.service.client';
import {RestaurantService} from '../../../services/restaurant.service.client';
import {Restaurant} from '../../../models/restaurant.model.client';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  rid: String;
  name: String;
  zipcode: String;
  reviews: [any];
  constructor(private activatedRoute: ActivatedRoute,
              private restaurantService: RestaurantService,
              private yelpService: YelpServiceClient) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      console.log(params['rid']);
      this.rid = params['rid'];
    });

    this.restaurantService.findRestaurantById(this.rid).subscribe(
        (restaurant: Restaurant) => {
          this.name = restaurant.name;
          this.zipcode = restaurant.zipcode;
          console.log('In function: ' + this.name);
          console.log('In function: ' + this.zipcode);

          this.yelpService.getReviews(this.name, this.zipcode).subscribe(
              (reviewsRes: [any]) => {
                console.log(reviewsRes['reviews']);
                this.reviews = reviewsRes['reviews'];

                // for (const key in reviewsRes) {
                //   console.log(key);
                //   console.log(reviewsRes[key]);
                // }
              }
          );
        }
    );
    console.log('rest: ' + this.name);
    console.log('rest: ' + this.zipcode);

  }

}
