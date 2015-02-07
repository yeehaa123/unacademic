import waypointsResolver from './waypointsResolver';
import WaypointsCtrl from './WaypointsCtrl';
import routes from './routes';

let app = angular.module('unacademic.content.waypoints', []);

app.factory('waypointsResolver', waypointsResolver);
app.controller('WaypointsCtrl', WaypointsCtrl);

app.config(routes);
