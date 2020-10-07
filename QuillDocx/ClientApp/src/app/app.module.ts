import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TinyMceComponent } from './tinyMce/tinyMce.component';
import { DocService } from './_services/doc.service';

import { QuillModule, QuillConfig } from 'ngx-quill';

// import Quill from 'quill';
// import QuillBetterTable from 'quill-better-table';

// Quill.register({
//   'modules/better-table': QuillBetterTable
// }, true);

// const quillConfig: QuillConfig = {
//   modules: {
//     table: true, // disable table module
//     clipboard: true
//     }
// };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    TinyMceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'tinyMce', component: TinyMceComponent },
    ]),
    QuillModule.forRoot()
    //QuillModule.forRoot(quillConfig)
  ],
  providers: [
    DocService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
