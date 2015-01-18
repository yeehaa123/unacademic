import schema from './schema';
import initData from './initData';
import Course from './course';

let app = angular.module('unacademic.models.course', []);

app.factory('schema', schema);
app.factory('initData', initData);
app.factory('Course', Course);
