import tinymce from 'tinymce';

export class HiddenTextPluggin {
  static toggleState = false;

  private static hideHiddenText() {
    console.info("hide", tinymce.activeEditor.getBody());
  }

  private static showHiddenText() {
    console.info("show", tinymce.activeEditor.getBody());
  }

  static register() {
    tinymce.PluginManager.add('hiddenText', function (editor, url) {

      // Add a button that opens a window
      editor.ui.registry.addToggleButton('hiddenText', {
        text: 'Hidden text',
        onAction: function (api) {
          HiddenTextPluggin.toggleState = !HiddenTextPluggin.toggleState;
          HiddenTextPluggin.toggleState ? HiddenTextPluggin.showHiddenText() : HiddenTextPluggin.hideHiddenText();
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
          HiddenTextPluggin.toggleState ? HiddenTextPluggin.showHiddenText() : HiddenTextPluggin.hideHiddenText();
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
