import MainCtrl from './MainCtrl';
import init from './init';
import routes from './routes';
import coverResolver from './cover/coverResolver';
import coverProps from './cover/coverProps';
import courseResolver from './course/courseResolver';
import courseProps from './course/courseProps';

let app = angular.module('unacademic.content', []);

app.factory('init', init);
app.factory('coverProps', coverProps);
app.factory('coverResolver', coverResolver);
app.factory('courseProps', courseProps);
app.factory('courseResolver', courseResolver);
app.controller('MainCtrl', MainCtrl);

app.config(routes);
