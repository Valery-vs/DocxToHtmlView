import tinymce from 'tinymce';

export class UiPluggin {
  static register() {
    tinymce.PluginManager.add('uiTest', function (editor, url) {
      const openDialog = function () {
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
          onSubmit: function (dialogApi) {
            const data = dialogApi.getData();
            // Insert content when the window form is submitted
            editor.insertContent('Title: ' + data['title']);
            dialogApi.close();
          }
        });
      };

      // Add a button that opens a window
      editor.ui.registry.addToggleButton('ui', {
        text: 'UI',
        onAction: function () {
          // Open window
          openDialog();
        }
      });

      // Adds a menu item, which can then be included in any menu via the menu/menubar configuration
      editor.ui.registry.addToggleMenuItem('ui', {
        text: 'UI',
        onAction: function (api) {
          // Open window
          openDialog();
        },
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
  }
}
