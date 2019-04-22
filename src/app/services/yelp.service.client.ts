import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class YelpServiceClient {
    constructor(private http: HttpClient) {}
    baseUrl = environment.baseUrl;

    getReviews(name: String, zipcode: String) {
        return this.http.get(this.baseUrl + '/api/yelp?name=' + name + '&zipcode=' + zipcode);
    }
}
