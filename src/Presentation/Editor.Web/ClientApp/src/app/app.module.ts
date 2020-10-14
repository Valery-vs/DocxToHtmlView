import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { QuillComponent } from './quill/quill.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TinyMceComponent } from './tinyMce/tinyMce.component';
import { HiddenTextPluggin } from './tinyMce/plugins/hiddenText.plugin';
import { UiPluggin } from './tinyMce/plugins/ui.plugin';
import { CanvasComponent } from './canvas/canvas.component';
import { DocService } from './_services/doc.service';

import { QuillModule, QuillConfig } from 'ngx-quill';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

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

HiddenTextPluggin.register();
UiPluggin.register();

@NgModule({
  declarations: [
    AppComponent,
    QuillComponent,
    NavMenuComponent,
    TinyMceComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: QuillComponent, pathMatch: 'full' },
      { path: 'tinyMce', component: TinyMceComponent },
      { path: 'canvas', component: CanvasComponent },
    ]),
    EditorModule,
    QuillModule.forRoot()
    //QuillModule.forRoot(quillConfig)
  ],
  providers: [
    DocService,
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
