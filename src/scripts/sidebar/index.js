import sidebar from './sidebar';
import toolbox from './toolbox';

import browsePanel from './browsePanel';
import learnPanel from './learnPanel';
import curatePanel from './curatePanel';

import SidebarCtrl from './controllers/sidebar';
import CuratePanelCtrl from './controllers/curatePanel';
import ToolboxCtrl from './controllers/toolbox';

let app = angular.module('unacademic.sidebar', []);

app.controller('SidebarCtrl', SidebarCtrl);
app.controller('ToolboxCtrl', ToolboxCtrl);
app.controller('CuratePanelCtrl', CuratePanelCtrl);

app.directive('sidebar', sidebar);
app.directive('toolbox', toolbox);

app.directive('browsePanel', browsePanel);
app.directive('learnPanel', learnPanel);
app.directive('curatePanel', curatePanel);
