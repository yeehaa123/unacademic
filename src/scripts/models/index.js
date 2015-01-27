import './cover/index';
import './course/index';
import './waypoint/index';
import './DataStore/index';
import BaseClass from './baseClass/index'

let app = angular.module('unacademic.models', [
  'unacademic.models.cover',
  'unacademic.models.course',
  'unacademic.models.waypoint',
  'unacademic.DataStore'
]);

app.factory('BaseClass', BaseClass);
