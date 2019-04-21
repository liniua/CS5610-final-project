import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {RestaurantService} from '../../../services/restaurant.service.client';
import {Restaurant} from '../../../models/restaurant.model.client';

@Component({
  selector: 'app-restaurant-show',
  templateUrl: './restaurant-show.component.html',
  styleUrls: ['./restaurant-show.component.css']
})
export class RestaurantShowComponent implements OnInit {

  widgets: Widget[] = [];
  rid: String;
  zipcode: String;

  constructor(private activatedRoute: ActivatedRoute,
              private widgetService: WidgetService,
              private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
        (params: any) => {
          console.log(params['rid']);
          this.rid = params['rid'];
          this.widgetService.findWidgetsByRId(this.rid)
              .subscribe(
                  (widgets: Widget[]) => {
                    this.widgets = widgets;
                  }
              );

          this.restaurantService.findRestaurantById(this.rid).subscribe(
              (restaurant: Restaurant) => {
                this.zipcode = restaurant.zipcode;
              }
          );
        });
  }

}
