# Single page management console application for rtstatistics.com

The app is built with Angular 2 and Angular Material 2.

The packaged application is embedded in web-manage and served from the Tomcat server.

## Develop

* To clean up node modules: `npm run clean`
* To re-generate typings information: `npm run typings install`. 
  You have to do this at least once befre you can compile the scripts.
* To run locally in the quickest way: `npm start`. 
  It will do the compilation automatically.
* To run locally using deliverables generated on the fly: `npm run server`.
* To build the deliverables for production usage: `npm run build`
  * Deliverables will be generated in `dist/` directory.
* To create webjar for distribution: `mvn clean package` after `npm run build`
  * The webjar file will be generated in `target/` directory.

When running locally, the listening port number is 3000.

## About authentication and authorization

1. The user must have been authenticated by web-manage before having access 
   to the console app.
1. Console app calls web-manage REST APIs without specifying api_key of the 
   organization in the requests.
1. When calling web-api REST APIs, console app automatically specifies send 
   or query api_key of the dataset in the requests.
1. Console app may ping web-manage server in background periodically to avoid
   user session time out. In such case, console app may stop pinging web-manage 
   server if the user has not been activ in console app for a long time.
1. When 403 error message is received from web-manager server, console app
   pops up a dialog showing the login page of web-manage. A special flag is
   passed to the login url indicating that the login page is embedded in the
   console app, so that after successfully login, the dialog can be closed silently.
