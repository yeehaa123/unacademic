import formHelpers from './formHelpers/formHelpers';
import navHelpers from './navHelpers/navHelpers';

let app = angular.module('unacademic.common', []);

app.factory('formHelpers', formHelpers);
app.factory('navHelpers', navHelpers);
