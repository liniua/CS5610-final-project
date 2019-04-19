import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {User} from '../models/user.model.client';
import { HttpClient } from '@angular/common/http';
import {SharedService} from './shared.service';
import {map} from 'rxjs/operators';


// injecting services into module

@Injectable()
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) { }

  login(username: String, password: String) {
    const body = {
      username : username,
      password : password
    };
    return this.http.post(this.baseUrl + '/api/login', body, {withCredentials: true});
  }

  logout() {
    return this.http.post(this.baseUrl + '/api/logout', '', {withCredentials: true});
  }

  register(username: String, password: String) {

    const user = {
      username : username,
      password : password
    };

    return this.http.post(this.baseUrl + '/api/register', user, {withCredentials: true});
  }

  loggedIn() {
    return this.http.post(this.baseUrl + '/api/loggedIn', '', {withCredentials: true})
      .pipe(map(
        (res: any) => {
          const user = res;
          if (user !== null) {
            this.sharedService.user = user; // setting user so as to share with all components
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      ));
  }


  createUser(username: String, password: String) {
    const body = {
      username: username,
      password: password
    };
    return this.http.post(this.baseUrl + '/api/user/', body);
  }

  findUserById(userId: String) {
    return this.http.get(this.baseUrl + '/api/user/' + userId);
      // .pipe(map((response: Response) => {
      //   return response.json();
      // }));
  }

  findUserByUsername(username: String) {
    return this.http.get(this.baseUrl + '/api/user?username=' + username);
  }

  findUserByCredentials(username: String, password: String) {
    return this.http.get(this.baseUrl + '/api/user?username=' + username + '&password=' + password);
  }


  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/api/user/' + user._id, user);

  }

  deleteUser(userId: String) {
    return this.http.delete(this.baseUrl + '/api/user/' + userId);
  }
}
