import './cover/index';
import './constellation/index';
import './waypoint/index';
import './checkpoint/index';
import './DataStore/index';
import BaseClass from './baseClass/index'

let app = angular.module('unacademic.models', [
  'unacademic.models.cover',
  'unacademic.models.constellation',
  'unacademic.models.waypoint',
  'unacademic.models.checkpoint',
  'unacademic.DataStore'
]);

app.factory('BaseClass', BaseClass);
