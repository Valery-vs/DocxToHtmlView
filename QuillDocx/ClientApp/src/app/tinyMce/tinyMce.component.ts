import { Component, OnInit } from '@angular/core';
import { DocService } from '../_services/doc.service';

@Component({
  selector: 'app-tinyMce',
  templateUrl: './tinyMce.component.html',
})
export class TinyMceComponent implements OnInit {
  public htmlContent: string;
  public content: string;
  public config = {
    base_url: '/tinymce',
    suffix: '.min',
    height: 500,
    menubar: 'file edit view insert format tools table help',
    plugins: [
      'print preview paste importcss searchreplace autolink autosave save',
      'directionality code visualblocks visualchars fullscreen image link',
      'media template codesample table charmap hr pagebreak nonbreaking anchor',
      'toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    ],
    toolbar: 'undo redo | bold italic underline strikethrough | \
            fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | \
            outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | \
            charmap emoticons | fullscreen  preview save print | \
            insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    templates: [
      { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
      { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
      { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
    ],
    contextmenu: 'link image imagetools table',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  };

  constructor(private docService: DocService) {

  }

  ngOnInit() {
  }



  onFileSelected(files: File[]) {
    if (files == null || files.length === 0) {
      return;
    }

    const file = files[0];

    this.docService.ConvertDocxToHtml(file).then(doc => {
        console.info('converted');
        this.content = doc.content;
      },
      error => console.error(error));
  }

}
