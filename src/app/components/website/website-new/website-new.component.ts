import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  @ViewChild('f') webForm: NgForm;
  userId: String;
  websites: Website[];
  webname: String;
  description: String;

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.userId = this.sharedService.user['_id'];
    this.websiteService.findWebsitesByUser(this.userId).subscribe(
      (websites: Website[]) => {
        this.websites = websites;
      });
  }

  createWeb() {
    this.webname = this.webForm.value.webname;
    this.description = this.webForm.value.description;
    const new_website = new Website(undefined, this.webname, this.userId, this.description);

    console.log('new website: ');
    console.log(new_website.name);
    console.log(new_website.developerId);
    this.websiteService.createWebsite(this.userId, new_website).subscribe(
      (website: Website) => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }
    );
  }
}
