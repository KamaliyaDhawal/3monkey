import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

	private projectListData = new BehaviorSubject(null);
	private archiveListData = new BehaviorSubject(null);
	private showreelListData = new BehaviorSubject(null);
  private currentProjectData = new BehaviorSubject(null);

  constructor() { }

  projectList = this.projectListData.asObservable();
  archiveList = this.archiveListData.asObservable();
  showreelList = this.showreelListData.asObservable();
  currentProject = this.currentProjectData.asObservable();

  changeProjectListData(data: any){
    this.projectListData.next(data);
  }

  changeArchiveListData(data: any){
    this.archiveListData.next(data);
  }

  changeShowreelListData(data: any){
    this.showreelListData.next(data);
  }

  changeCurrentProject(data: any){
    this.currentProjectData.next(data);
  }
}
