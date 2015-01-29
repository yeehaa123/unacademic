import sidebar from './sidebar';
import toolbox from './toolbox/index';
import panels from './panels/index';

import SidebarCtrl from './controllers/sidebar';

let app = angular.module('unacademic.sidebar', [
  'unacademic.sidebar.panels',
  'unacademic.sidebar.toolbox'
]);

app.controller('SidebarCtrl', SidebarCtrl);

app.directive('sidebar', sidebar);
