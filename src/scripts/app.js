import angular from 'angular';
import 'angular-ui-router';
import 'angular-ui-select';

import './appState/index';
import './common/index';
import './models/index';
import './content/index';
import './sidebar/index';
import './cards/index';

let app = angular.module('unacademic', [
  'ui.router',
  'ui.select',
  'unacademic.common',
  'unacademic.appState',
  'unacademic.models',
  'unacademic.content',
  'unacademic.sidebar',
  'unacademic.cards'
]);

app.constant('baseUrl', 'https://cth-curriculum.firebaseio.com');
app.constant('appModes', ['browse', 'learn', 'curate']);

app.config(function($urlRouterProvider){
  $urlRouterProvider.otherwise('cover');
});

app.run(function($rootScope, history, dispatcher) {
  let initialized = false;

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, error) {
    if(!initialized){
      event.preventDefault();
      initialized = true;
      initialize(toState, toParams);
    } 
  });

  function initialize(toState, toParams){
    history.initialize();
    window.backlog = history.get;

    // let state = dispatcher.getState();
    // let urlState = toState.url.match(/^\/(.+?)\//) || toState.url.match(/^\/(.+)\/?/);
    // let view = urlState[1];
    // dispatcher.setState({view: {name: view, curator: toParams.curator, id: toParams.id}});
    dispatcher.setState( {mode: 'browse', view: {name: 'waypoints'} });
  }
});
