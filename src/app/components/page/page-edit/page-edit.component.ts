import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  @ViewChild('f') pageForm: NgForm;
  pageID: String;
  page: Page;

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router) { }

  updatePage() {
    this.page.name = this.pageForm.value.pageName;
    this.page.title = this.pageForm.value.title;
    const new_page = new Page(this.pageID, this.page.name, this.page.websiteId, this.page.title);
    this.pageService.updatePage(this.pageID, new_page).subscribe(
      (page: Page) => {
        this.page = page;
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      });
  }
  deletePage() {
    this.pageService.deletePage(this.pageID).subscribe(
      () => this.router.navigate(['../'], {relativeTo: this.activatedRoute})
    );
  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.get('pid'));
      this.pageID = params.get('pid');
      this.pageService.findPageById(this.pageID).subscribe((page: Page) => {
          this.page = page;
        }
      );
    });
  }

}
