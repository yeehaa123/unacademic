import schema from './schema';
import initData from './initData';
import Checkpoint from './checkpoint';

let app = angular.module('unacademic.models.checkpoint', []);

app.factory('schema', schema);
app.factory('initData', initData);
app.factory('Checkpoint', Checkpoint);
