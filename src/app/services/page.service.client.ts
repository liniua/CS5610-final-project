import {Injectable} from '@angular/core';
import {Page} from '../models/page.model.client';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable()
export class PageService {

  baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) {
  }


  createPage(websiteId, page) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this._http.post(url, page);
  }

  findPageByWebsiteId(websiteId) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this._http.get(url);
  }

  findPageById(pageId) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this._http.get(url);
  }

  updatePage(pageId, page) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this._http.put(url, page);
  }

  deletePage(pageId) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this._http.delete(url);
  }
}
