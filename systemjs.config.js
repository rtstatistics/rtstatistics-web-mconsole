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
    'mustache':                   { main: 'mustache.js', defaultExtension: 'js'}
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade',
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
  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
  });
  // Add package entries for angular material 2 packages
  material2PackageNames.forEach(function(pkgName) {
    packages['@angular2-material/'+pkgName] = { main: pkgName + '.js', defaultExtension: 'js' };
  });
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