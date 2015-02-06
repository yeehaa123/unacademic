import schema from './schema';
import initData from './initData';
import Constellation from './constellation';

let app = angular.module('unacademic.models.constellation', []);

app.factory('schema', schema);
app.factory('initData', initData);
app.factory('Constellation', Constellation);
