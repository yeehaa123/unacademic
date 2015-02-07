import './cover/index';
import './constellation/index';
import './waypoints/index';
import './waypoint/index';

let app = angular.module('unacademic.content', [
  'unacademic.content.cover',
  'unacademic.content.constellation',
  'unacademic.content.waypoints',
  'unacademic.content.waypoint'
]);
