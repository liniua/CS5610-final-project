import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { QuillEditorModule } from 'ngx-quill-editor';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { RestaurantNewComponent } from './components/restaurant/restaurant-new/restaurant-new.component';
import { RestaurantEditComponent } from './components/restaurant/restaurant-edit/restaurant-edit.component';
import { SearchResultListComponent } from './components/result-page/search-result-list/search-result-list.component';
import { WidgetChooserComponent } from './components/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './components/widget/widget-edit/widget-edit.component';
import { WidgetListComponent } from './components/widget/widget-list/widget-list.component';
import { WidgetHeaderComponent } from './components/widget/widget-edit/widget-header/widget-header.component';
import { WidgetImageComponent } from './components/widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './components/widget/widget-edit/widget-youtube/widget-youtube.component';
import {UserService} from './services/user.service.client';
import {RestaurantService} from './services/restaurant.service.client';
import {WidgetService} from './services/widget.service.client';
import {FlickrService} from './services/flickr.service.client';
import {SortableDirective} from './components/widget/widget-list/sortable.directive';
import {OrderByPipe} from './components/widget/widget-list/order-by-pipe.pipe';
import {SafePipe} from './safe.pipe';
import { WidgetHtmlComponent } from './components/widget/widget-edit/widget-html/widget-html.component';
import { WidgetTextComponent } from './components/widget/widget-edit/widget-text/widget-text.component';
import { FlickrImageSearchComponent } from './components/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';
import { SharedService} from './services/shared.service';
import {AuthGuard} from './services/auth-guard.service';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AdminPageComponent } from './components/user-page/admin-page/admin-page.component';
import { OwnerPageComponent } from './components/user-page/owner-page/owner-page.component';
import { CustomerPageComponent } from './components/user-page/customer-page/customer-page.component';
import { RestaurantShowComponent } from './components/restaurant/restaurant-show/restaurant-show.component';
import { HomeComponent } from './components/home/home.component';
import {YelpServiceClient} from './services/yelp.service.client';
import {ReviewListComponent} from './components/result-page/review-list/review-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    UserPageComponent,
    RestaurantNewComponent,
    RestaurantEditComponent,
    SearchResultListComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WidgetListComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    SafePipe,
    SortableDirective,
    OrderByPipe,
    WidgetHtmlComponent,
    WidgetTextComponent,
    FlickrImageSearchComponent,
    UserPageComponent,
    AdminPageComponent,
    OwnerPageComponent,
    CustomerPageComponent,
    RestaurantShowComponent,
    HomeComponent,
    ReviewListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Routing,
    HttpClientModule,
    QuillEditorModule
  ],
  providers: [UserService, RestaurantService, WidgetService, FlickrService, YelpServiceClient, SharedService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
