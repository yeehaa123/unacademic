let app = angular.module('unacademic.appState', [
  'unacademic.appState.currentState',
  'unacademic.appState.permission'
]);

import currentState from './currentState/index';
import permission from './permission/index';
import history from './history';
import queue from './queue';
import mutator from './mutator';
import switcher from './switcher';
import dispatcher from './dispatcher';

app.factory('history', history);
app.factory('currentState', currentState);
app.factory('queue', queue);
app.factory('mutator', mutator);
app.factory('switcher', switcher);
app.factory('dispatcher', dispatcher);
