import './cover';
import './course';
import './DataStore';
import BaseClass from './baseClass'

let app = angular.module('unacademic.models', [
  'unacademic.models.cover',
  'unacademic.models.course',
  'unacademic.DataStore'
]);

app.factory('BaseClass', BaseClass);
