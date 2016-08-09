# Single page management console application for rtstatistics.com

[ ![Codeship Status for james-hu/rtstatistics-web-mconsole](https://codeship.com/projects/dcfe6b60-0c41-0134-7457-368b7d3cc702/status?branch=master)](https://codeship.com/projects/156034)

The app is built with Angular 2 and Angular Material 2.

The packaged application is embedded in web-manage and served from the Tomcat server.

## Develop

* NPM 3 is required.
* To clean up node modules: `npm run clean`
* To re-generate typings information: `npm run typings install`. 
  You have to do this at least once befre you can compile the scripts.
* To run locally in the quickest way: `npm start`. 
  It will do the compilation automatically.
* To run locally using deliverables generated on the fly: `npm run server`.
* To build the deliverables for production usage: `npm run build`
  * Deliverables will be generated in `dist/` directory.
* To create webjar for distribution: `mvn package`
  * The webjar file will be generated in `target/` directory.
* To release the webjar: 
  1. `mvn -B jgitflow:release-start` 
  1. ``npm --no-git-tag-version version `git rev-parse --abbrev-ref HEAD | sed -e "s#release/##"` ``
  1. `git add package.json`
  1. `git commit -m 'update version number according to gitflow'`
  1. `mvn jgitflow:release-finish`

When running locally, the listening port number is 3000.

## About authentication

### When running inside web-manage

1. The user should have already been authenticated by web-manage before having access 
   to the console app.
1. Console app calls web-manage REST APIs without specifying api_key of the 
   organization in the requests.
1. If the user's session with web-manage timed out, authentication may fail when calling 
   web-manage REST API. In that case, the console app
   will prompt the user to authenticate again by either specifying an API key or by
   logging in in an embedded log in page.
1. When 403 error message is received from web-manager server, console app
   pops up a dialog showing the login page of web-manage. A special flag is
   passed to the login url indicating that the login page is embedded in the
   console app, so that after successfully login, the dialog can be closed silently.

### When running outside of web-manage

1. The console app will prompt the user to authenticate by 
   specifying an API key.
