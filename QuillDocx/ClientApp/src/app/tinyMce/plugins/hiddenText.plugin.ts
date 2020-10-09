import tinymce from 'tinymce';
import Editor from 'tinymce';

export class HiddenTextPluggin {
  static toggleState = false;

  private static hideHiddenText(edito: Editor) {
    console.info("hide", Editor.activeEditor.getBody());
  }

  private static showHiddenText(editor: Editor) {
    console.info("show", Editor.activeEditor.getBody());
  }

  static register() {
    tinymce.PluginManager.add('hiddenText', function (editor, url) {

      // Add a button that opens a window
      editor.ui.registry.addToggleButton('hiddenText', {
        text: 'Hidden text',
        onAction: function (api) {
          HiddenTextPluggin.toggleState = !HiddenTextPluggin.toggleState;
          HiddenTextPluggin.toggleState ? HiddenTextPluggin.showHiddenText(editor) : HiddenTextPluggin.hideHiddenText(editor);
        },
        onSetup: function(api) {
          api.setActive(HiddenTextPluggin.toggleState);
          return function() {};
        }

      });

      // Adds a menu item, which can then be included in any menu via the menu/menubar configuration
      editor.ui.registry.addToggleMenuItem('hiddenText', {
        text: 'Hidden text',
        onAction: function (api) {
          HiddenTextPluggin.toggleState = !HiddenTextPluggin.toggleState;
          HiddenTextPluggin.toggleState ? HiddenTextPluggin.showHiddenText(editor) : HiddenTextPluggin.hideHiddenText(editor);
        },
        onSetup: function(api) {
          api.setActive(HiddenTextPluggin.toggleState);
          return function() {};
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
  }
}
