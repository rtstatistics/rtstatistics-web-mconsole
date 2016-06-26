module.exports = {
  server: {
    middleware: {
      1: require('http-rewrite-middleware').getMiddleware([
          // below are workarounds because SystemJS keeps adding '.js' extension to all resources
          {from: '^/src/(.*).html.js$', to: '/src/$1.html'},
          {from: '^/src/(.*).css.js$', to: '/src/$1.css'},
          {from: '^/src/(.*).jpg.js$', to: '/src/$1.jpg'},
          {from: '^/src/(.*).gif.js$', to: '/src/$1.gif'},
          {from: '^/src/(.*).png.js$', to: '/src/$1.png'}
      ])
    }
  }
};