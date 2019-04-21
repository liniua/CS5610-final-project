import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';

import {RestaurantNewComponent} from './components/restaurant/restaurant-new/restaurant-new.component';
import {RestaurantEditComponent} from './components/restaurant/restaurant-edit/restaurant-edit.component';
import {SearchResultListComponent} from './components/result-page/search-result-list/search-result-list.component';
import {WidgetListComponent} from './components/widget/widget-list/widget-list.component';
import {WidgetChooserComponent} from './components/widget/widget-chooser/widget-chooser.component';
import {WidgetEditComponent} from './components/widget/widget-edit/widget-edit.component';
import {FlickrImageSearchComponent} from './components/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';
import {AuthGuard} from './services/auth-guard.service';
import {UserPageComponent} from './components/user-page/user-page.component';
import {RestaurantShowComponent} from './components/restaurant/restaurant-show/restaurant-show.component';



// Import all other components here

const APP_ROUTES: Routes = [
  { path : 'login' , component: LoginComponent},
  { path : 'register' , component: RegisterComponent},
  { path : 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path : 'userpage', component: UserPageComponent, canActivate: [AuthGuard]},
  { path : 'userpage/:zpc/results', component: SearchResultListComponent, canActivate: [AuthGuard]},
  { path : 'userpage/:rid/reviews', component: UserPageComponent, canActivate: [AuthGuard]},

  { path : 'userpage/new', component: RestaurantNewComponent, canActivate: [AuthGuard]},
  { path : 'userpage/:rid', component: RestaurantEditComponent, canActivate: [AuthGuard]},
  { path : 'userpage/:rid/show', component: RestaurantShowComponent, canActivate: [AuthGuard]},
  { path : 'userpage/:rid/widget', component: WidgetListComponent, canActivate: [AuthGuard]},
  { path : 'userpage/:rid/widget/new', component: WidgetChooserComponent, canActivate: [AuthGuard]},
  { path : 'userpage/:rid/widget/:wgid', component: WidgetEditComponent, canActivate: [AuthGuard]},
  { path : 'userpage/:rid/widget/:wgid/flickr', component: FlickrImageSearchComponent, canActivate: [AuthGuard]},
  // so on
];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {useHash: true});
