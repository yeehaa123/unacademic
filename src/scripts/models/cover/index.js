import schema from './schema';
import initData from './initData';
import Cover from './cover';

let app = angular.module('unacademic.models.cover', []);

app.factory('schema', schema);
app.factory('initData', initData);
app.factory('Cover', Cover);
