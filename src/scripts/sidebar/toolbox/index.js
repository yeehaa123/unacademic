import toolbox from './toolbox';
import ToolboxCtrl from './controllers/toolbox';

let app = angular.module('unacademic.sidebar.toolbox', []);
app.controller('ToolboxCtrl', ToolboxCtrl);
app.directive('toolbox', toolbox);
