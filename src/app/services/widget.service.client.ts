
import {Injectable} from '@angular/core';
import {Widget} from '../models/widget.model.client';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export  class WidgetService {

  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  createWidget(pageId, widget) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this._http.post(url, widget);
  }

  findWidgetsByPageId(pageId) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this._http.get(url);
  }

  findWidgetById(widgetId) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this._http.get(url);
  }

  updateWidget(widgetId, widget) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this._http.put(url, widget);
  }

  deleteWidget(widgetId) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this._http.delete(url);
  }

  reorderWidgets(startIndex, endIndex, pageId) {

    const url = this.baseUrl + '/api/page/' + pageId + '/widget?start=' + startIndex + '&end=' + endIndex;
    return this._http.put(url, '');
  }

  // createWidget(pageId: String, widget: Widget) {
  //   widget._id = Math.floor(Math.random() * 10000).toString();
  //   widget.pageId = pageId;
  //   this.widgets.push(widget);
  // }
  //
  // findWidgetsByPageId(pageId: String) {
  //   const resultSet = [];
  //   for ( const i in this.widgets) {
  //     if (this.widgets[i].pageId === pageId) {
  //       resultSet.push(this.widgets[i]);
  //     }
  //   }
  //   return resultSet;
  // }
  //
  // findWidgetById(widgetId: String) {
  //   return this.widgets.find(function (widget) {
  //     return widget._id === widgetId;
  //   });
  // }
  //
  // updateWidget(widgetId: String, widget: Widget) {
  //   for ( const i in this.widgets ) {
  //     if ( this.widgets[i]._id === widgetId ) {
  //       switch (widget.widgetType) {
  //         case 'HEADING':
  //           this.widgets[i].text = widget.text;
  //           this.widgets[i].size = widget.size;
  //           return true;
  //
  //         case 'IMAGE':
  //           this.widgets[i].text = widget.text;
  //           this.widgets[i].url = widget.url;
  //           this.widgets[i].width = widget.width;
  //           return true;
  //
  //         case 'YOUTUBE':
  //           this.widgets[i].text = widget.text;
  //           this.widgets[i].size = widget.size;
  //           this.widgets[i].url = widget.url;
  //           this.widgets[i].width = widget.width;
  //           return true;
  //
  //         case 'HTML':
  //           this.widgets[i].text = widget.text;
  //           return true;
  //       }
  //
  //     }
  //   }
  //   return false;
  // }
  //
  // deleteWidget(widgetId: String) {
  //   for (const i in this.widgets) {
  //     if (this.widgets[i]._id === widgetId) {
  //       const j = +i;
  //       this.widgets.splice(j, 1);
  //     }
  //   }
  // }
}
