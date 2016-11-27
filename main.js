'use strict';
/* eslint no-console:0, quotes:0, no-debugger:0 */
/* global
require, __dirname
*/

const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));
const path = require('path');
const timers = bluebird.promisifyAll(require('timers'));
const pug = require('pug');

// ------------------------------------------------------------
// Copy browser dependencies.
const fse = require('fs-extra');
const fseasync = bluebird.promisifyAll(fse);

fseasync.ensureDirAsync('libs').then(() => {
  return Promise.all([
    CopyFile('node_modules/vue/dist/vue.js', 'libs/vue.js'),
    CopyFile('node_modules/jquery/dist/jquery.js', 'libs/jquery.js')
    // CopyFile('node_modules/dropbox/dist/dropbox-sdk.js', 'libs/dropbox-sdk.js')
  ]);
}).then(() => { 
  console.log('Static javascript dependencies copied.');
}).catch(err => {  // eslint-disable-line 
  debugger; 
});

function CopyFile(from, to) {
  return new Promise((resolve, reject) => {
    fse.copy(from, to, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
