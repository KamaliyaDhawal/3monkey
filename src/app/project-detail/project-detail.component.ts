import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Webservice } from '../service/webservice';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDataService } from '../service/common-data.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  @Input() project : any;
  @Output() pageEvent =  new EventEmitter();
  isfullScreen = false;
  projectDetail : any;
  media : any;

  lang = localStorage.getItem('lang')? localStorage.getItem('lang'):1;
  constructor(public webservice : Webservice,private route: ActivatedRoute, private router: Router, private commonDataService: CommonDataService) {
    // var project = JSON.parse(localStorage.getItem('currentProject'));
    // this.projectDetail = project;
    // this.media = project.media;
    // localStorage.removeItem('currentProject');
    // debugger
    // this.route.params.subscribe(params => {
    //   this.webservice.getProjectDetail(params.projectId).subscribe((res: any) => {
    //     // this.projectDetail = res.data.project;
    //     this.media = res.data.media;
    //   debugger;
    
			 //  });
    // });
    this.route.params.subscribe(params => {
      // var project = JSON.parse(localStorage.getItem('currentProject'));
      this.commonDataService.currentProject.subscribe(
        (data) => {
          var project = JSON.parse(data);
          if(project != undefined || project != null) {
            this.projectDetail = project;
            this.media = project.media_asset;
          }
          // localStorage.removeItem('currentProject');
          this.webservice.getProjectDetail(params.projectId).subscribe((res: any) => {
            // this.projectDetail = res.data.project;
            if(this.projectDetail == undefined || this.projectDetail == null) {
                this.projectDetail = res.data.project;
            }
            if(this.media == undefined || this.media == null) {
                this.media = res.data.media;
            }
          });
        }
      );
    });
  }

  ngOnInit() {
    
  }

  close(){
    this.pageEvent.emit({operation : "close"})
  }
  fullScreen(){
    this.pageEvent.emit({operation : "fullScreen"});
    this.isfullScreen = ! this.isfullScreen; 
  }
}
