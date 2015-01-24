import user from './user';
import mode from './mode';
import resource from './resource';
import timestamp from './timestamp';
import view from './view';
import currentState from './currentState';

let app = angular.module('unacademic.appState.currentState', []);

app.factory('view', view);
app.factory('user', user);
app.factory('mode', mode);
app.factory('resource', resource);
app.factory('timestamp', timestamp);

export default currentState;

