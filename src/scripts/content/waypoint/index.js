import waypointResolver from './waypointResolver';
import WaypointCtrl from './WaypointCtrl';
import routes from './routes';

let app = angular.module('unacademic.content.waypoint', []);

app.factory('waypointResolver', waypointResolver);
app.controller('WaypointCtrl', WaypointCtrl);

app.config(routes);
