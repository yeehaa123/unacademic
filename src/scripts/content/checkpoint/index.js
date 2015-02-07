import checkpointResolver from './checkpointResolver';
import CheckpointCtrl from './CheckpointCtrl';
import routes from './routes';

let app = angular.module('unacademic.content.checkpoint', []);

app.factory('checkpointResolver', checkpointResolver);
app.controller('CheckpointCtrl', CheckpointCtrl);

app.config(routes);
