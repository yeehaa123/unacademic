import permission from './permission';
import proposal from './proposal';
import newState from './newState';
import rules from './rules';

let app = angular.module('unacademic.appState.permission', []);

app.factory('permission', permission);
app.factory('proposal', proposal);
app.factory('newState', newState);
app.factory('rules', rules);
