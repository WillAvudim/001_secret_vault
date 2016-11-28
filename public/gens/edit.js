
          RegisterRender(
            "edit",
            function() { with(this){return _h('fieldset',{staticClass:"dialog"},[_h('legend',["Service editing"]),_h('div',[_h('label',{attrs:{"for":"service-editing-name"}},["Service name: "]),_h('input',{directives:[{name:"model",rawName:"v-model",value:(name),expression:"name"}],attrs:{"id":"service-editing-name"},domProps:{"value":_s(name)},on:{"input":function($event){if($event.target.composing)return;name=$event.target.value}}})]),_h('textarea',{directives:[{name:"model",rawName:"v-model",value:(notes),expression:"notes"}],attrs:{"name":"textarea","rows":"10","cols":"50","placeholder":"notes"},domProps:{"value":_s(notes)},on:{"input":function($event){if($event.target.composing)return;notes=$event.target.value}}}),_h('div',{directives:[{name:"show",rawName:"v-show",value:(!!fields.length),expression:"!!fields.length"}]},[_h('table',[_m(0),_l((fields),function(field,index){return _h('tr',[_h('td',[_h('input',{directives:[{name:"model",rawName:"v-model",value:(field.name),expression:"field.name"}],domProps:{"value":_s(field.name)},on:{"input":function($event){if($event.target.composing)return;field.name=$event.target.value}}})]),_h('td',[_h('input',{directives:[{name:"model",rawName:"v-model",value:(field.value),expression:"field.value"}],domProps:{"value":_s(field.value)},on:{"input":function($event){if($event.target.composing)return;field.value=$event.target.value}}})]),_h('td',[_h('button',{on:{"click":function($event){GeneratePassword(index)}}},["P"])]),_h('td',[_h('button',{on:{"click":function($event){Delete(index)}}},["X"])]),_h('td',[_h('input',{directives:[{name:"model",rawName:"v-model",value:(field.hide),expression:"field.hide"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(field.hide)?_i(field.hide,null)>-1:_q(field.hide,true)},on:{"change":function($event){var $$a=field.hide,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_i($$a,$$v);if($$c){$$i<0&&(field.hide=$$a.concat($$v))}else{$$i>-1&&(field.hide=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{field.hide=$$c}}}})])])})])]),_h('div',[_h('button',{on:{"click":AddNewField}},["Add Field"]),_h('span',["|"]),_h('button',{on:{"click":OK}},["OK"]),_h('button',{on:{"click":Cancel}},["Cancel"])])])} }, 
            [ function() { with(this){return _h('tr',[_h('th',["Name"]),_h('th',["Value"]),_h('th',["Generate Password"]),_h('th',["Delete"]),_h('th',["Hide"])])} } ]
          );