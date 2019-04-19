import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  @ViewChild('f') imageForm: NgForm;
  pageID: String;
  wgid: String;
  websiteId: String;
  width: String;
  name: String;
  text: String;
  url: String;
  widget: Widget;
  baseUrl: String;

  constructor(private activatedRoute: ActivatedRoute,
              private widgetService: WidgetService,
              private route: Router) {}

  update() {
    this.widgetService.updateWidget(this.wgid, this.widget)
      .subscribe(
        (data: any) => this.route.navigate(['/user/website', this.websiteId, 'page', this.pageID, 'widget']),
        (error: any) => console.log(error)
      );
  }

  delete() {
    this.widgetService.deleteWidget(this.wgid) .subscribe(
      (data: any) => this.route.navigate(['/user/website', this.websiteId, 'page', this.pageID, 'widget']),
      (error: any) => console.log(error)
    );
  }

  search() {
    this.route.navigate(['./flickr'], {relativeTo: this.activatedRoute});
  }
  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteId = params['wid'];
        this.pageID = params['pid'];
        this.wgid = params['wgid'];
      });
    this.widgetService.findWidgetById(this.wgid)
      .subscribe(
        (data: any) => this.widget = data,
        (error: any) => console.log(error)
      );
  }

}
