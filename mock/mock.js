import Vue from 'vue'

import component_edit from './components/edit.vue'
import component_list from './components/list.vue'
import component_login from './components/login.vue'

// Mock workflow through screens.
$(function() {
  // Individual screen.
  DisplayScreen(component_login, {
    OK: function() {
      DisplayScreen(component_list, {
        AddService: function() {
          DisplayDialog(component_edit, {
            OK: function() {
              $("#dialog-container").html('');
            }
          })
        }
      })
    }
  });
});

function DisplayScreen(screen_component, method_overrides) {
  $("#screen-container").html('<div id="screen"></div>');
  const screen = new Vue($.extend({}, screen_component, {
    methods: $.extend({}, screen_component.methods, method_overrides)
  }));
  screen.$mount('#screen');
}

function DisplayDialog(dialog_component, method_overrides) {
  $("#dialog-container").html('<div class="modal"><div id="dialog"></div></div>');
  const dialog = new Vue($.extend({}, dialog_component, {
    methods: $.extend({}, dialog_component.methods, method_overrides)
  }));
  dialog.$mount('#dialog');
}
