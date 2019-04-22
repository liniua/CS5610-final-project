import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../../../models/restaurant.model.client';
import {RestaurantService} from '../../../services/restaurant.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.css']
})
export class SearchResultListComponent implements OnInit {
  zipcode: String;
  restaurants: Restaurant[];

  constructor(private activatedRoute: ActivatedRoute,
              private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
        (params: any) => {
          this.zipcode = params['zpc'];
          console.log(this.zipcode);
        });
    this.restaurantService.findRestaurantsByZipcode(this.zipcode).subscribe(
        (restaurants: Restaurant[]) => {
          this.restaurants = restaurants;
        }
    );
  }


}
