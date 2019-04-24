
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export  class WidgetService {

  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  createWidget(rid, widget) {
    const url = this.baseUrl + '/api/restaurant/' + rid + '/widget';
    return this._http.post(url, widget);
  }

  findWidgetsByRId(rid) {
    const url = this.baseUrl + '/api/restaurant/' + rid + '/widget';
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

  reorderWidgets(startIndex, endIndex, rid) {

    const url = this.baseUrl + '/api/restaurant/' + rid + '/widget?start=' + startIndex + '&end=' + endIndex;
    return this._http.put(url, '');
  }
}
