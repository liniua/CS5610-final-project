import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {

  rid: String;
  widgetId: String;
  widget: Widget;
  url: any;

  defaultWidgetValues =
    {
      'HEADING': {widgetType: 'HEADING', size: '1', text: ''},
      'IMAGE': {widgetType: 'IMAGE', width: '100%'},
      'YOUTUBE': {widgetType: 'YOUTUBE', width: '100%'},
      'HTML': {widgetType: 'HTML'},
      'TEXT': {widgetType: 'TEXT', placeholder: ''}
    };

  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.rid = params['rid'];
          console.log(this.rid);
        }
      );
  }

  // creating a widget with default values
  createWidget(widgetType) {

    this.widget = this.defaultWidgetValues[widgetType];
    console.log(this.widget);
    this.widgetService.createWidget(this.rid, this.widget)
      .subscribe(
        (data: Widget) => {
          this.widgetId = data._id;
          console.log('data.widgetType in res' + data.widgetType);
          this.router.navigate(['userpage/', this.rid, 'widget', this.widgetId]);
        },
        (error: any) => console.log(error)
      );
  }
}
