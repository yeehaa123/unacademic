import formHelpers from './formHelpers';
import navHelpers from './navHelpers';
import resourceHelpers from './resourceHelpers';

let app = angular.module('unacademic.common', []);

app.factory('formHelpers', formHelpers);
app.factory('navHelpers', navHelpers);
app.factory('resourceHelpers', resourceHelpers);
