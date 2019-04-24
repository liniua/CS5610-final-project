import {Component, OnInit, ViewChild} from '@angular/core';
import {Restaurant} from '../../../models/restaurant.model.client';
import {SharedService} from '../../../services/shared.service';
import {RestaurantService} from '../../../services/restaurant.service.client';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-owner-page',
  templateUrl: './owner-page.component.html',
  styleUrls: ['./owner-page.component.css']
})
export class OwnerPageComponent implements OnInit {

  @ViewChild('f') adsForm: NgForm;
  userId: String;
  restaurants: Restaurant[];
  adsFee: Number;

  constructor(private sharedService: SharedService,
              private restaurantService: RestaurantService,
              private route: Router) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    console.log(this.userId);
    this.restaurantService.findRestaurantsByUser(this.userId).subscribe(
        (restaurants: Restaurant[]) => {
          this.restaurants = restaurants;
        });
  }

  // payForAds(restaurant) {
  //   this.adsFee = this.adsForm.value.ads;
  //   const rest = {
  //     _id: restaurant._id,
  //   name: restaurant.name,
  //   ownerId: restaurant.ownerId,
  //   description: restaurant.description,
  //   address: restaurant.address,
  //   zipcode: restaurant.zipcode,
  //   ads: +restaurant.ads + +this.adsFee};
  //
  //   this.restaurantService.updateRestaurant(this.userId, restaurant._id, rest).subscribe(
  //       () => {
  //         this.route.navigate(['/userpage']);
  //       }
  //   );
  // }

}
