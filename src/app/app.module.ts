import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { HomeComponent } from './home/home.component';
import { ShowreelComponent } from './showreel/showreel.component';
import { ArchiveComponent } from './archive/archive.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Webservice } from './service/webservice';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProjectDetailComponent,
    HomeComponent,
    ShowreelComponent,
    ArchiveComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    AngularDraggableModule,
    HttpClientModule
  ],
  providers: [ Webservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
