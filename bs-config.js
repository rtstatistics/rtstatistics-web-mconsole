module.exports = {
  server: {
    middleware: {
      1: require('http-rewrite-middleware').getMiddleware([
          // below are workarounds because SystemJS keeps adding '.js' extension to all resources
          {from: '^/src/(.*).html.js$', to: '/src/$1.html'},
          {from: '^/src/(.*).css.js$', to: '/src/$1.css'}
      ])
    }
  }
};