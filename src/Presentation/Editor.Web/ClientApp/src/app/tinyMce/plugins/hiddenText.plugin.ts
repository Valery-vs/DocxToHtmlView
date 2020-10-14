import tinymce from 'tinymce';

export class HiddenTextPluggin {
  static toggleState = false;

  private static hideHiddenText() {
    console.info("hide", tinymce.activeEditor.getBody());
    const hiddenElements = tinymce.activeEditor.dom.select('span');
    hiddenElements.forEach(e => {
      if (e.style.display == 'inherit') {
        console.info(e.textContent);
        e.style.display = 'none';
      }
    });
  }

  private static showHiddenText() {
    const hiddenElements = tinymce.activeEditor.dom.select('span');
    hiddenElements.forEach(e => {
      if (e.style.display == 'none') {
        console.info(e.textContent);
        e.style.display = 'inherit';
      }
    });
  }

  private static onAction() {
    HiddenTextPluggin.toggleState = !HiddenTextPluggin.toggleState;
    HiddenTextPluggin.toggleState ? HiddenTextPluggin.showHiddenText() : HiddenTextPluggin.hideHiddenText();
  }

  static register() {
    tinymce.PluginManager.add('hiddenText', function (editor, url) {

      // Add a button that opens a window
      editor.ui.registry.addToggleButton('hiddenText', {
        text: 'Hidden text',
        type: 'togglebutton',
        onAction: function (api) {
          HiddenTextPluggin.onAction();
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
          HiddenTextPluggin.onAction();
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
