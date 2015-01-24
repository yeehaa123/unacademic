import angular from 'angular-bsfy';
import 'angular-ui-router';

import './appState';
import './common';
import './models';
import './content';
import './sidebar';
import './cards';

let app = angular.module('unacademic', [
  'ui.router',
  'unacademic.common',
  'unacademic.appState',
  'unacademic.models',
  'unacademic.content',
  'unacademic.sidebar',
  'unacademic.cards'
]);

app.constant('baseUrl', 'https://cth-curriculum.firebaseio.com/');
//app.constant('baseUrl', 'http://private-7c8dd-unacademic.apiary-mock.com');

app.run(function(Cover, $state, $rootScope, history, dispatcher) {
  initialize();

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    event.preventDefault();
    $state.go('cover');
  });

  function initialize(){
    history.initialize();

    dispatcher.setState({
      name: 'cover',
      mode: 'browsing',
    });

    // dispatcher.setState({
    //   name: 'course',
    //   mode: 'browsing',
    //   resource: {
    //     curator: 'yeehaa',
    //     id: '1420924907004'
    //   }
    // });

    window.backlog = history.get;
  }
});
