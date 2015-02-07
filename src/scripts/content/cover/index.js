import coverResolver from './coverResolver';
import CoverCtrl from './CoverCtrl';
import routes from './routes';

let app = angular.module('unacademic.content.cover', []);

app.factory('coverResolver', coverResolver);
app.controller('CoverCtrl', CoverCtrl);

app.config(routes);
