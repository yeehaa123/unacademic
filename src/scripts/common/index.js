import formHelpers from './formHelpers';
import navHelpers from './navHelpers';

let app = angular.module('unacademic.common', []);

app.factory('formHelpers', formHelpers);
app.factory('navHelpers', navHelpers);
