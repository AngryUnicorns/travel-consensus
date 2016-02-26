var React = require('react');
var ReactDOM = require('react-dom');
var GlobalTopBar = require('./components/GlobalTopBar.jsx');
var GlobalSidebar = require('./components/GlobalSidebar.jsx');
var GlobalTaskArea = require('./components/GlobalTaskArea.jsx');



/******** THIS IS GLOBAL STATE *********/
/**/  window.globalStateTripId = 1;  /**/
/**/  window.globalStateTaskId = null;  /**/
/***************************************/
/*
    Just these two variables allow us to dynamically update
    our app. Every couple of seconds, the app asks the database
    for the tasks, messages, and suggestions for the task and trip
    we are looking at. We then pass those lists of data to the
    React components we build. They each detect new data has been
    passed, virtually build a new component, then only if there has
    been a change will it actually change the app view.

    That's pretty much the crux of the app updating.
*/


var postRequests = require('./requests/post');
var deleteRequests = require('./requests/delete');

/*
  Create the global react components we use for the
  top, side, and main task areas. Pass in functions
  they or their child components will then use to
  make post requests to the database.

  I am not sure if this is the appropriate approach.
*/
var sidebar  = React.createElement(GlobalSidebar, {
  addNewTask: postRequests.addNewTask,

});
var taskArea = React.createElement(GlobalTaskArea, {
  addNewMessage: postRequests.addNewMessage,
  addNewSuggestion: postRequests.addNewSuggestion,
  deleteSuggestion: deleteRequests.deleteSuggestion
});
var topbar   = React.createElement(GlobalTopBar, {
  // empty props
});

topbar   = ReactDOM.render(topbar, document.getElementById('react-main-mount'));
sidebar  = ReactDOM.render(sidebar, document.getElementById('react-sidebar-mount'));
taskArea = ReactDOM.render(taskArea, document.getElementById('react-task-mount'));

var requestHandler = require('./requests/get')
requestHandler.setViewDataUpdateInterval(sidebar, taskArea, 100);

/*
  on the index.html located within client/public/index.html, we've added
  "<div id='react-main-mount'></div>" within the body tag.
  this appends the react view into the html page which uses the app-bundle.js

  we'll continue refactoring the dom elements into individual react component as
  we progress. Be explicit when naming files.

  script for app-bundle.js is located at the bottom before the </body> tag
*/
