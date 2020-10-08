import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { QuillComponent } from './quill/quill.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TinyMceComponent } from './tinyMce/tinyMce.component';
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

import tinymce from 'tinymce';

tinymce.PluginManager.add('example', function (editor, url) {
    var openDialog = function () {
    console.info(editor.getBody());
    return editor.windowManager.open({
      title: 'Example plugin',
      body: {
        type: 'panel',
        items: [
          {
            type: 'input',
            name: 'title',
            label: 'Title'
          }
        ]
      },
      buttons: [
        {
          type: 'cancel',
          text: 'Close'
        },
        {
          type: 'submit',
          text: 'Save',
          primary: true
        }
      ],
      onSubmit: function (api) {
        var data = api.getData();
        // Insert content when the window form is submitted
        editor.insertContent('Title: ' + 'data.title');
        api.close();
      }
    });
  };

  // Add a button that opens a window
  editor.ui.registry.addButton('example', {
    text: 'My button',
    onAction: function () {
      // Open window
      openDialog();
    }
  });

  // Adds a menu item, which can then be included in any menu via the menu/menubar configuration
  editor.ui.registry.addMenuItem('example', {
    text: 'Example plugin',
    onAction: function () {
      // Open window
      openDialog();
    }
  });

  return {
    getMetadata: function () {
      return {
        name: 'Example plugin',
        url: 'http://exampleplugindocsurl.com'
      };
    }
  };
});

@NgModule({
  declarations: [
    AppComponent,
    QuillComponent,
    NavMenuComponent,
    TinyMceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: QuillComponent, pathMatch: 'full' },
      { path: 'tinyMce', component: TinyMceComponent },
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
