/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'src':                        'src', // 'dist',
    'text-loader':                'node_modules/systemjs-plugin-text/',
    '@angular2-material':         'node_modules/@angular2-material',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'src':                        { main: 'main.js', defaultExtension: 'js' },
    'text-loader':                { main: 'text.js', defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
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
    'list',
    'tabs',
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
      }
    }
  }
  System.config(config);
})(this);