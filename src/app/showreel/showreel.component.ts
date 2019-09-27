import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Webservice } from '../service/webservice';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDataService } from '../service/common-data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-showreel',
  templateUrl: './showreel.component.html',
  styleUrls: ['./showreel.component.css']
})
export class ShowreelComponent implements OnInit {

  @Output() pageEvent =  new EventEmitter();
  isfullScreen = false;
  showreels: any;
  lang = localStorage.getItem('lang')? localStorage.getItem('lang'):1;
  srcFile: string;

  constructor(public webservice : Webservice,private route: ActivatedRoute, private commonDataService: CommonDataService, private sanitizer: DomSanitizer) {
    this.route.params.subscribe(params => {
      this.getShowreelList();
      this.webservice.getReelDetail(params.projectId).subscribe((res: any) => {
        // this.project = res.data.project;
        // this.medias = res.data.media;
        // console.log(res.data);
        });
    });

  }

  ngOnInit() {
  }

  getShowreelList() {
    //var showreelList = localStorage.getItem('showreelList');
    var showreelList;
    this.commonDataService.showreelList.subscribe(
      (data) => {
        showreelList = data;
        // if(showreelList == null){
        if(showreelList == null || showreelList == undefined || this.lang != JSON.parse(showreelList)[0].language_id){
          this.webservice.getReels().subscribe((res: any) => {
            this.showreels = res.data[0];
            // localStorage.setItem('showreelList',JSON.stringify(res.data[0]));
            this.commonDataService.changeShowreelListData(JSON.stringify(res.data));
            this.srcFile = this.showreels.showreel_file || 'https://www.youtube.com/embed/vTUGrWHzhmw';
            // this.srcFile = 'https://www.youtube.com/embed/vTUGrWHzhmw';
          });
        }
        // if(showreelList != null){
        if(showreelList != null && showreelList != undefined && showreelList != null && this.lang == JSON.parse(showreelList)[0].language_id){
          this.showreels = JSON.parse(showreelList)[0];
          this.srcFile = this.showreels.showreel_file || 'https://www.youtube.com/embed/vTUGrWHzhmw';
          // this.srcFile = 'https://www.youtube.com/embed/vTUGrWHzhmw';
        }
      }
    );
  }

  close(){
    this.pageEvent.emit({operation : "close"})
  }
  fullScreen(){
    this.pageEvent.emit({operation : "fullScreen"});
    this.isfullScreen = ! this.isfullScreen; 
  }
}
