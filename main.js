'use strict';
/* eslint no-console:0, quotes:0, no-debugger:0 */
/* global
require, __dirname
*/

const bluebird = require('bluebird');
const fs = bluebird.promisifyAll(require('fs'));  // https://nodejs.org/api/fs.html
const fse = bluebird.promisifyAll(require('fs-extra'));  // https://www.npmjs.com/package/fs-extra
const path = require('path');
const pug = require('pug');


// 1st - promise-based pug-to-html conversion for mock.html
// 2nd - introduce settings in mock.html
// 3rd - consider bootstrap UI library + learn CSS and make everything nice, it's time
// DO: design the global screen w/ settings (do nothing if in a dialog) (pug + jquery)
// DO: both mock and main app should use the global screen


// ------------------------------------------------------------
// Prepare everything for mocks.
fse.ensureDirAsync('libs').then(() => Promise.all([
  fse.copyAsync('node_modules/vue/dist/vue.js', 'libs/vue.js'),
  fse.copyAsync('node_modules/jquery/dist/jquery.js', 'libs/jquery.js')
  // fse.copyAsync('node_modules/dropbox/dist/dropbox-sdk.js', 'libs/dropbox-sdk.js')
])).then(() => { 
  console.log('Static javascript dependencies copied for mocks.');
}).catch(err => {  // eslint-disable-line 
  debugger;
});

// ------------------------------------------------------------
// Static compilation of .vue components.
const static_vue_compiler = require('./modules/static-vue-compiler.js');
static_vue_compiler('mock/components', 'public/gens');

// ------------------------------------------------------------
// Prepare all dependencies for development.
fse.ensureDirAsync('public/libs').then(() => Promise.all([
  fse.copyAsync('node_modules/vue/dist/vue.js', 'public/libs/vue.js'),
  fse.copyAsync('node_modules/jquery/dist/jquery.js', 'public/libs/jquery.js'),
  fse.copyAsync('node_modules/dropbox/dist/dropbox-sdk.js', 'public/libs/dropbox-sdk.js')
])).then(() => { 
  console.log('Static javascript dependencies copied for development.');
}).catch(err => {  // eslint-disable-line 
  debugger;
});

// ------------------------------------------------------------
// Serving. 
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Views are pug templates: resnpose.render(...).
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function (request, response) {
  // Render with a parameter: response.render('index', { title: 'First App!' });
  response.render('index', {});
});

app.listen(3000);

// ------------------------------------------------------------
// Open the browser for development.
const opn = require('opn');
opn('http://127.0.0.1:3000/');
