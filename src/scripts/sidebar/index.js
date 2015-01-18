import sidebar from './sidebar';
import SidebarCtrl from './controllers/sidebar.js';

let app = angular.module('unacademic.sidebar', []);

app.controller('SidebarCtrl', SidebarCtrl);
app.directive('sidebar', sidebar);
