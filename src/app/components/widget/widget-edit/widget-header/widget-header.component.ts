import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  @ViewChild('f') headerForm: NgForm;
  websiteId: String;
  wgid: String;
  pageID: String;
  widget: Widget;
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private route: Router) { }

  delete() {
    this.widgetService.deleteWidget(this.wgid)
      .subscribe(
        (data: any) => this.route.navigate(['/user/website', this.websiteId, 'page', this.pageID, 'widget']),
        (error: any) => console.log(error)
      );
  }

  update() {
    // this.widget.text = this.headerForm.value.text;
    // this.widget.size = this.headerForm.value.size;
    // this.widgetService.updateWidget(this.wgid, this.widget);

    this.widgetService.updateWidget(this.wgid, this.widget)
      .subscribe(
        (data: any) => this.route.navigate(['/user/website', this.websiteId, 'page', this.pageID, 'widget']),
        (error: any) => console.log(error)
      );
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.websiteId = params['wid'];
        this.pageID = params['pid'];
        this.wgid = params['wgid'];
        console.log(this.websiteId);
        console.log(this.pageID);
        console.log(this.wgid);
      });
    this.widgetService.findWidgetById(this.wgid)
      .subscribe(
        (data: any) => this.widget = data,
        (error: any) => console.log(error)
      );
  }

}
