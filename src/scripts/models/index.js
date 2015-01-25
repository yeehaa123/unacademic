import './cover/index';
import './course/index';
import './DataStore/index';
import BaseClass from './baseClass/index'

let app = angular.module('unacademic.models', [
  'unacademic.models.cover',
  'unacademic.models.course',
  'unacademic.DataStore'
]);

app.factory('BaseClass', BaseClass);
