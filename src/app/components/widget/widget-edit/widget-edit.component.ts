import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  wgid: string;
  widget: Widget;
  // header = 'HEADING'; youtube = 'YOUTUBE'; text = 'TEXT'; html = 'HTML'; image = 'IMAGE';
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params['wgid']);
      this.wgid = params['wgid'];
    });

    this.widgetService.findWidgetById(this.wgid)
      .subscribe(
        (data: Widget) => {
          this.widget = data;
        }
      );
  }

}
