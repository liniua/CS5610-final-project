import {Injectable} from '@angular/core';
import {Restaurant} from '../models/restaurant.model.client';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable()
export class RestaurantService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}


  createRestaurant(userId: String, restaurant: Restaurant) {
    const body = restaurant;
    const url = this.baseUrl + '/api/user/' + userId + '/restaurant';
    console.log(body);
    return this.http.post(url, body);
  }

  findRestaurantsByUser(userId: String) {
    return this.http.get(this.baseUrl + '/api/user/' + userId + '/restaurant');
  }

  findRestaurantById(restId: String) {
    return this.http.get(this.baseUrl + '/api/restaurant/' + restId);
  }

  updateRestaurant(userId: String, restId: String, restaurant: Restaurant) {

    const url = this.baseUrl + '/api/user/' + userId + '/restaurant/' + restId;
    const body = restaurant;
    return this.http.put(url, body);
  }

  deleteRestaurant(userId: String, restId: String) {
    const url = this.baseUrl + '/api/user/' + userId + '/restaurant/' + restId;
    return this.http.delete(url);
  }

  findRestaurantsByZipcode(zipcode: String) {
    return this.http.get(this.baseUrl + '/api/restaurants/' + zipcode);
  }

  findRestaurantByName(name: String) {
    return this.http.get(this.baseUrl + '/api/restaurantname/' + name);
  }
}
