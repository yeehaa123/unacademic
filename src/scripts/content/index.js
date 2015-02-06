import MainCtrl from './MainCtrl';
import init from './init';
import routes from './routes';

import coverResolver from './cover/coverResolver';
import coverProps from './cover/coverProps';

import constellationResolver from './constellation/constellationResolver';
import constellationProps from './constellation/constellationProps';

import waypointsResolver from './waypoints/waypointsResolver';
import waypointsProps from './waypoints/waypointsProps';

import waypointResolver from './waypoint/waypointResolver';
import waypointProps from './waypoint/waypointProps';

let app = angular.module('unacademic.content', []);

app.factory('init', init);

app.factory('coverProps', coverProps);
app.factory('coverResolver', coverResolver);

app.factory('constellationProps', constellationProps);
app.factory('constellationResolver', constellationResolver);

app.factory('waypointsProps', waypointsProps);
app.factory('waypointsResolver', waypointsResolver);

app.factory('waypointProps', waypointProps);
app.factory('waypointResolver', waypointResolver);

app.controller('MainCtrl', MainCtrl);

app.config(routes);
