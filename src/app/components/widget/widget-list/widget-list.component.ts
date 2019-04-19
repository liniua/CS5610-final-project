import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  widgets: Widget[] = [];
  websiteId: String;
  pageID: String;

  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        console.log(params['pid']);
        console.log(params['wid']);
        this.pageID = params['pid'];
        this.websiteId = params['wid'];
        this.widgetService.findWidgetsByPageId(this.pageID)
          .subscribe(
            (widgets: Widget[]) => {
              this.widgets = widgets;
            }
          );
      });
  }

  // receiving the emitted event
  reorderWidgets(indexes) {
    // call widget service function to update widget as per index
    this.widgetService.reorderWidgets(indexes.startIndex, indexes.endIndex, this.pageID)
      .subscribe(
        (data) => console.log(data)
      );
  }

}
