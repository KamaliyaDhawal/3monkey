import { Component } from '@angular/core';
import { Webservice } from './service/webservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'drag';
  showActions = false;
  generals : any;
  locations : any;
  monkeys : any;
  menuType : any = 'about';
  language : any = 'english';
  // lang: any;
  lang: any = localStorage.getItem('lang')? localStorage.getItem('lang'):1;
  constructor(private route: ActivatedRoute, public webservice : Webservice,
    private router: Router) {

    };

    ngOnInit() {  
      this.webservice.getGeneralMenu().subscribe((res: any) => {
          this.generals = res.data;
      });
      this.webservice.getlocationMenu().subscribe((res: any) => {
        this.locations = res.data;
      });
      this.webservice.getMonkeyMenu().subscribe((res: any) => {
        this.monkeys = res.data;
      });
    } 

  getTime(){
    let date  = new Date();
    var hor = date.getHours();
    var o = "AM";
    if(hor > 12){
      hor -=12 ;
      o= "PM";
    }
    var minute : any =  date.getMinutes();
    if(minute <= 9){
      minute = "0" + minute;
    }
    return hor + ":" + minute + " " + o
  }
  getDate(){
    let date  = new Date();
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
  }
  close(){
    this.showActions = false;
  }
  gotoPage(msg){
    this.menuType = msg;
    console.log(msg); 
  }
  changelang(id){
    this.lang = id;
    localStorage.setItem('lang', id);
    location.reload();
  }
 
}
