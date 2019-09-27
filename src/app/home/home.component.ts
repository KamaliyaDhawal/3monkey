import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Webservice } from '../service/webservice';
import { CommonDataService } from '../service/common-data.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	projects : any = [];
	archives : any;
	showreels : any;
	menuType : any;
	showModel = false;
	showArciveModel = false;
	showShowReelModel = false;
	selectedProject = {}
	fullScreen = false;
	archiveFullScreen = false;
	showReelFullScreen = false;
	lang = localStorage.getItem('lang')? localStorage.getItem('lang'):1;
	

	@ViewChild('projectModel') projectModel;
	@ViewChild('archiveModel') archiveModel;
	@ViewChild('showreelModel') showreelModel;

	zIndex = 1;
	projectZIndex = 1;
	showRealZIndex = 1;
	archiveZIndex = 1;
	projectId = "";
	constructor(private route: ActivatedRoute, public webservice : Webservice, private commonDataService: CommonDataService,
		private router: Router) {
		
	}

	ngOnInit() {
		this.getProjectList();
		this.getArchiveList();
		this.getShowreelList();
		this.getRouterData();
	}

	getProjectList() {
		// var projectList = localStorage.getItem('projectList');
		var projectList;
		this.commonDataService.projectList.subscribe(
			(data) => {
				projectList = data;
				// if(this.projects != null){
				if(this.projects != null && projectList != undefined && projectList != null && this.lang == JSON.parse(projectList)[0].language_id){
					this.projects = JSON.parse(projectList); 
				}
				// if(this.projects == null){
				if(this.projects == null || (projectList == undefined || projectList == null) || this.lang != JSON.parse(projectList)[0].language_id){
					let catId = 1; 
					this.webservice.getProjects(catId).subscribe((res: any) => {
						this.projects = res.data;
						// localStorage.setItem('projectList',JSON.stringify(res.data));
						this.commonDataService.changeProjectListData(JSON.stringify(res.data));
					});
				}
			}
		);
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
						this.archives = res.data;
						// localStorage.setItem('archiveList',JSON.stringify(res.data));
						this.commonDataService.changeArchiveListData(JSON.stringify(res.data));
					});
				}
				// if(archiveList != null){
				if(archiveList != null  && archiveList != undefined && archiveList != null && this.lang == JSON.parse(archiveList)[0].language_id){
					this.archives = JSON.parse(archiveList);
				}
			}
		);
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
					});
				}
				// if(showreelList != null){
				if(showreelList != null && showreelList != undefined && showreelList != null && this.lang == JSON.parse(showreelList)[0].language_id){
					this.showreels = JSON.parse(showreelList)[0];
				}
			}
		);
	}

	getRouterData() {
		this.route.params.subscribe(params => {
			if (params.type) {
				this.showModel = false;
				this.showArciveModel = false;
				this.showShowReelModel = false;
				var types = params.type.split("-");
				for (let i = types.length - 1; i >= 0; i--) {

					if (types[i] == "project") {
						this.showModelDetail(params.projectId);
					} else if (types[i] == "archive") {
						this.showArchive(params.projectId)
					}
					if (types[i] == "showreel") {
						this.showShowReel(params.projectId)
					}
				}

			}
		});
	}

	showModelDetail(index) {
		this.projectId = index;
		this.projectZIndex = this.zIndex + 1;
		this.zIndex++;
		this.showModel = true;
		this.selectedProject = this.projects[index];
	}
	projectDetailEvent(event) {
		if (event.operation == "close") {
			var params = []
			if (this.showShowReelModel) {
				params.push("showreel");
			}
			if (this.showArciveModel) {
				params.push("archive");
			}
			if (params.length >= 1) {
				this.router.navigateByUrl("/detail/" + params.join("-"));
			} else {
				this.router.navigateByUrl("/");
			}

		} else if (event.operation == "fullScreen") {
			this.fullScreen = !this.fullScreen;
			this.projectModel.resetPosition();
		}
	}
	showArchive(id) {
		this.archiveZIndex = this.zIndex + 1;
		this.zIndex++;

		this.showArciveModel = true;
	}

	showArchiveEvent(event) {
		if (event.operation == "close") {
			var params = [];
			if (this.showModel) {
				params.push("project");
			}
			if (this.showShowReelModel) {
				params.push("showreel");
			}
			if (params.length >= 1) {
				if (this.showModel) {
					this.router.navigateByUrl("/detail/" + params.join("-") + "/" + this.projectId);
				} else {
					this.router.navigateByUrl("/detail/" + params.join("-"));
				}
			} else {
				this.router.navigateByUrl("/");
			}


		} else if (event.operation == "fullScreen") {
			this.archiveFullScreen = !this.archiveFullScreen;
			this.archiveModel.resetPosition();
		} else if (event.operation == "detail") {
			var params = [];
			params.push("project");
			if (this.showArciveModel) {
				params.push("archive");
			}
			if (this.showShowReelModel) {
				params.push("showreel");
			}
			this.router.navigateByUrl("/detail/" + params.join("-") + "/" + event.project.id);
		}
	}

	showShowReel(id) {
		this.showRealZIndex = this.zIndex + 1;
		this.zIndex++;
		this.showShowReelModel = true;
	}
	ShowReelEvent(event) {
		if (event.operation == "close") {
			var params = [];
			if (this.showModel) {
				params.push("project");
			}
			if (this.showArciveModel) {
				params.push("archive");
			}
			if (params.length >= 1) {
				if (this.showModel) {
					this.router.navigateByUrl("/detail/" + params.join("-") + "/" + this.projectId);
				} else {
					this.router.navigateByUrl("/detail/" + params.join("-"));
				}
			} else {
				this.router.navigateByUrl("/");
			}
		} else if (event.operation == "fullScreen") {
			this.showReelFullScreen = !this.showReelFullScreen;
			this.showreelModel.resetPosition();
		}
	}
	closeAll() {
		this.showShowReelModel = false;
		this.showArciveModel = false;
		this.showModel = false;
	}
	projectDrag() {
		this.projectZIndex = this.zIndex + 1;
		this.zIndex++;
	}
	showReelDrag() {
		this.showRealZIndex = this.zIndex + 1;
		this.zIndex++;
	}
	archiveDrag() {
		this.archiveZIndex = this.zIndex + 1;
		this.zIndex++;
	}

	getProjectUrl(projectId) {
		var params = [];
		params.push("project");
		if (this.showArciveModel) {
			params.push("archive");
		}
		if (this.showShowReelModel) {
			params.push("showreel");
		}
		return "/detail/" + params.join("-") + "/" + projectId;
	}

	projectDetails(event, project) {
		event.stopPropagation();
		var url = this.getProjectUrl(project.id);
		// localStorage.setItem('currentProject', JSON.stringify(project));
		this.commonDataService.changeCurrentProject(JSON.stringify(project));
		this.router.navigate([url]);
	}

	getShowrealUrl() {
		var params = [];
		params.push("showreel");
		if (this.showArciveModel) {
			params.push("archive");
		}
		if (this.showModel) {
			params.push("project");
		}
		return "/detail/" + params.join("-") + "/" + this.projectId;
	}
	getArchiveUrl() {
		var params = [];
		params.push("archive");
		if (this.showShowReelModel) {
			params.push("showreel");
		}
		if (this.showModel) {
			params.push("project");
		}
		return "/detail/" + params.join("-") + "/" + this.projectId;

	}
}
