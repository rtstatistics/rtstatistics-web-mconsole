/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'src':                        'src', // 'dist',
    'text-loader':                'node_modules/systemjs-plugin-text',
    'raw-loader':                 'node_modules/raw-loader',
    '@angular2-material':         'node_modules/@angular2-material',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'angular2-toaster':           'node_modules/angular2-toaster',
    'ng2-material':               'node_modules/ng2-material',
    'md2/select':                        'node_modules/md2',
    'mustache':                   'node_modules/mustache'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'src':                        { main: 'main.js', defaultExtension: 'js' },
    'text-loader':                { main: 'text.js', defaultExtension: 'js' },
    'raw-loader':                 { main: 'index.js', defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-toaster':           { main: 'angular2-toaster.js', defaultExtension: 'js'},
    'ng2-material':               { main: 'index.js', defaultExtension: 'js' },
    'md2/select':                 { main: 'select.js', format: 'cjs', defaultExtension: 'js'},
    '@angular2-material/core':    { main: 'core.js', defaultExtension: 'js'},
    '@angular2-material/icon':    { main: 'icon.js', defaultExtension: 'js'},
    '@angular2-material/button':  { main: 'button.js', defaultExtension: 'js'},
    '@angular2-material/card':    { main: 'card.js', defaultExtension: 'js'},
    '@angular2-material/input':   { main: 'input.js', defaultExtension: 'js'},
    '@angular2-material/tabs':    { main: 'tabs.js', defaultExtension: 'js'},
    '@angular2-material/checkbox':    { main: 'checkbox.js', defaultExtension: 'js'},
    '@angular2-material/sidenav':     { main: 'sidenav.js', defaultExtension: 'js'},
    '@angular2-material/list':    { main: 'list.js', defaultExtension: 'js'},
    '@angular2-material/toolbar':     { main: 'toolbar.js', defaultExtension: 'js'},
    '@angular2-material/progress-bar':    { main: 'progress-bar.js', defaultExtension: 'js'},
    '@angular2-material/slide-toggle':     { main: 'slide-toggle.js', defaultExtension: 'js'},
    '@angular2-material/radio':   { main: 'radio.js', defaultExtension: 'js'},
    'mustache':                   { main: 'mustache.js', defaultExtension: 'js'}
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'forms',
    'platform-browser',
    'platform-browser-dynamic',
    'router'
  ];
  var material2PackageNames = [
    'core',
    'button',
    'card',
    'sidenav',
    'toolbar',
    'grid-list',
    'progress-bar',
    'input',
    'checkbox',
    'radio',
    'list',
    'tabs',
    'slide-toggle',
    'icon'
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages,
    meta:{
      'src/components/*.html.js':{
        loader: 'text-loader'
      },
      'src/components/*.css.js':{
        loader: 'text-loader'
      },
      'src/*.css.js':{
        loader: 'text-loader'
      },
      'src/*.jpg.js':{
        loader: 'raw-loader'
      },
      'src/*.gif.js':{
        loader: 'raw-loader'
      },
      'src/*.png.js':{
        loader: 'raw-loader'
      }
    }
  }
  System.config(config);
})(this);