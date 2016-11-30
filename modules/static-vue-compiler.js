'use strict';
/* eslint no-console:0, quotes:0, no-debugger:0 */
/* global
require, module
*/

const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));  // https://nodejs.org/api/fs.html
const fse = bluebird.promisifyAll(require('fs-extra'));  // https://www.npmjs.com/package/fs-extra
const timers = bluebird.promisifyAll(require('timers'));
const pug = require('pug');
const path = require('path');
const template_compiler = require('vue-template-compiler');

// Watches the specified dir. 
// Calls OnChange(full_file_path) when that file is first discovered or changed.
// No action on file removals, unless they are re-introduced back again.
function WatchDir(dir, OnChange) {
  const file_list = {};
  function ScanDir() {
    fs.readdirAsync(dir).then(files => {
      for (const file of files) {
        if (!file.endsWith('.vue')) {
          continue;
        }

        // Check the last modification (m)time.
        const full_path = dir + '/' + file;
        fs.statAsync(full_path).then(function (stats) {
          if (file_list[full_path] !== stats.mtime.toJSON()) {
            file_list[full_path] = stats.mtime.toJSON();
            OnChange(full_path);
          }
        }).catch(e => { console.error('Unable to stat dir', dir, e); });
      }
    }).catch(e => { console.error('Unable to scan dir', dir, e); });
  }

  ScanDir();
  timers.setInterval(ScanDir, 3000);
}

// Compiles all updated .vue components into static renderers.
function CompileVueComponents(path_to_vue_components, path_to_output_modules) {
  fse.ensureDirAsync(path_to_output_modules).then(() => {
    WatchDir(path_to_vue_components, filename => {
      fs.readFileAsync(filename, 'utf8').then(file_content => {
        const pug_content = template_compiler.parseComponent(file_content).template.content;
        const html = pug.render(pug_content);
        const renderers = template_compiler.compile(html);

        // Put into different files as
        // RegisterMe(component-name, render, staticRenderFns);
        //+ scan for changes off timer & update; full scan in the beginning
        const component_name = path.basename(filename, '.vue');
        let static_fns = '';
        for (const static_fn of renderers.staticRenderFns) {
          if (static_fns.length > 0) {
            static_fns += ',';
          }
          static_fns += `function() { ${static_fn} }`;
        }

        const register_render_code = `
          RegisterRender(
            "${component_name}",
            function() { ${renderers.render} },
            [ ${static_fns} ]
          );`;
        const target_file = path_to_output_modules + '/' + component_name + '.js';
        return fs.writeFileAsync(target_file, register_render_code)
          .then(() => { console.info("Successfully compiled:", filename); });
      }).catch(e => { console.error('Unable to read file', filename, e); });
    });
  }).catch(e => { console.error('fse.ensureDir failed', path_to_output_modules, e); });
}

module.exports = CompileVueComponents;
