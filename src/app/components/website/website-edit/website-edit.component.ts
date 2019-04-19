import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  @ViewChild('f') websiteForm: NgForm;
  wid: String;
  // websiteName: String;
  // description: String;
  userId: String;
  website: Website;
  websites: Website[];
  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    console.log(this.userId);
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.wid = params['wid'];
        console.log(this.wid);
      });
    this.websiteService.findWebsitesByUser(this.userId).subscribe(
      (websites: Website[]) => {
        this.websites = websites;
      });
    console.log(this.websites);
    this.websiteService.findWebsitesById(this.userId, this.wid).subscribe(
      (website: Website) => {
        console.log(website);
        this.website = website;
      }
    );
    console.log(this.website);
  }

  updateWebsite() {
    if (this.websiteForm.value.webname === '') {
      alert('Please input new web name');
      return;
    }
    this.website.name = this.websiteForm.value.websiteName;
    this.website.description = this.websiteForm.value.description;
    this.websiteService.updateWebsite(this.userId, this.wid, this.website).subscribe(
      (website: Website) => {
        this.website = website;
      }
    );
  }
  deleteWeb() {
    console.log(this.wid);
    this.websiteService.deleteWebsite(this.userId, this.wid).subscribe(
      () => this.router.navigate(['../'], {relativeTo: this.activatedRoute}));
  }

}
