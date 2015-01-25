import schema from './schema';
import initData from './initData';
import Cover from './cover';

let app = angular.module('unacademic.models.cover', []);

app.factory('coverSchema', schema);
app.factory('coverInitData', initData);
app.factory('Cover', Cover);
