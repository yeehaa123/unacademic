import user from './internal/user';
import mode from './internal/mode';
import resource from './internal/resource';
import timestamp from './internal/timestamp';
import view from './internal/view';
import currentState from './currentState';

let app = require('angular').module('unacademic.appState.currentState', []);

app.factory('view', view);
app.factory('user', user);
app.factory('mode', mode);
app.factory('resource', resource);
app.factory('timestamp', timestamp);

export default currentState;

