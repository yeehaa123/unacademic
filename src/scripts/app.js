import angular from 'angular';
import 'angular-ui-router';

import './appState/index';
import './common/index';
import './models/index';
import './content/index';
import './sidebar/index';
import './cards/index';

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
