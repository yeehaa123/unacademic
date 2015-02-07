import constellationResolver from './constellationResolver';
import ConstellationCtrl from './ConstellationCtrl';
import routes from './routes';

let app = angular.module('unacademic.content.constellation', []);

app.factory('constellationResolver', constellationResolver);
app.controller('ConstellationCtrl', ConstellationCtrl);

app.config(routes);
