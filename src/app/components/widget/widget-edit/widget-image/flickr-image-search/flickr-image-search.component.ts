import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../../models/widget.model.client';
import {WidgetService} from '../../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {FlickrService} from '../../../../../services/flickr.service.client';

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  websiteId: string;
  pageId: string;
  widgetId: string;
  photos: [any];
  error: string;
  searchText: string;
  widget: Widget;

  constructor(private flickrService: FlickrService,
              private widgetService: WidgetService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.widgetId = params['wgid'];
        console.log('wgid ' + this.widgetId);
        this.widgetService.findWidgetById(this.widgetId).subscribe(
          (widget: Widget) => {
            this.widget = widget;
          });
      });
  }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          // console.log('this is searchPhotos' + data);
          let val = data;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          this.photos = val.photos.photo;

        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';

    this.widget.url = url;
    console.log(url);
    this.widgetService
      .updateWidget(this.widgetId, this.widget)
      .subscribe(
        (data: any) => {
          const result = data;
          if (result) {
            this.router.navigate(['/user/website', this.websiteId, 'page', this.pageId, 'widget', this.widgetId]);
          } else {
            this.error = 'failed!';
          }
        }
      );
  }

}
