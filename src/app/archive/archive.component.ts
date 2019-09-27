import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Webservice } from '../service/webservice';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDataService } from '../service/common-data.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  @Output() pageEvent = new EventEmitter();
  isfullScreen = false;
  params : any;
  projects = [];
  medias = [];
  lang = localStorage.getItem('lang')? localStorage.getItem('lang'):1;

  constructor(public webservice : Webservice,private route: ActivatedRoute, private router: Router, private commonDataService: CommonDataService) {
    this.route.queryParams.subscribe((params : any) => {
        this.params = params;
    });

			  // this.webservice.getProjects(2).subscribe((res: any) => {
				 //  this.projects = res.data;
			  // });
  }

  ngOnInit() {
    this.getArchiveList();
  }

  getArchiveList() {
    // var archiveList = localStorage.getItem('archiveList');
    var archiveList;
    this.commonDataService.archiveList.subscribe(
      (data) => {
        archiveList = data;
        // if(archiveList == null){
        if(archiveList == null || archiveList == undefined || this.lang != JSON.parse(archiveList)[0].language_id){
          let catId = 2; 
          this.webservice.getProjects(catId).subscribe((res: any) => {
            this.projects = res.data;
            // localStorage.setItem('archiveList',JSON.stringify(res.data));
            this.commonDataService.changeArchiveListData(JSON.stringify(res.data));
          });
        }
        // if(archiveList != null){
        if(archiveList != null  && archiveList != undefined && archiveList != null && this.lang == JSON.parse(archiveList)[0].language_id){
          this.projects = JSON.parse(archiveList);
        }
      }
    );
  }

  close() {
    this.pageEvent.emit({ operation: "close" })
  }
  showProject(project) {
    this.commonDataService.changeCurrentProject(JSON.stringify(project));
    this.pageEvent.emit({ operation: "detail", project : project })
  }
  fullScreen() {
    this.pageEvent.emit({ operation: "fullScreen" });
    this.isfullScreen = !this.isfullScreen;
  }

  getProjectUrl(projectId) {
    var href  = this.router.url;
    href.replace(/project/g," ");
    if(href.split('/')[2] != null){
      var urlpoint = "project" + '-' + href.split('/')[2] ;
    }else{
      var urlpoint = "project";
    }
		return "/detail/" + urlpoint + "/" + projectId;
	}
}
