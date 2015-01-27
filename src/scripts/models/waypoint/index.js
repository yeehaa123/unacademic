import schema from './schema';
import initData from './initData';
import Waypoint from './waypoint';

let app = angular.module('unacademic.models.waypoint', []);

app.factory('coverSchema', schema);
app.factory('coverInitData', initData);
app.factory('Waypoint', Waypoint);
