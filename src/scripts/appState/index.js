let app = angular.module('unacademic.appState', [
  'unacademic.appState.currentState'
]);

import currentState from './currentState';
import history from './history';
import queue from './queue';
import permission from './permission';
import mutator from './mutator';
import switcher from './switcher';
import dispatcher from './dispatcher';

app.factory('history', history);
app.factory('currentState', currentState);
app.factory('queue', queue);
app.factory('permission', permission);
app.factory('mutator', mutator);
app.factory('switcher', switcher);
app.factory('dispatcher', dispatcher);
