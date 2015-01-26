import sidebar from './sidebar';
import toolbox from './toolbox';

import browsePanel from './browse-panel';
import learnPanel from './learn-panel';
import curatePanel from './curate-panel';

import SidebarCtrl from './controllers/sidebar';
import CuratePanelCtrl from './controllers/curate-panel';
import ToolboxCtrl from './controllers/ToolboxCtrl';

let app = angular.module('unacademic.sidebar', []);

app.controller('SidebarCtrl', SidebarCtrl);
app.controller('ToolboxCtrl', ToolboxCtrl);
app.controller('CuratePanelCtrl', CuratePanelCtrl);

app.directive('sidebar', sidebar);
app.directive('toolbox', toolbox);

app.directive('browsePanel', browsePanel);
app.directive('learnPanel', learnPanel);
app.directive('curatePanel', curatePanel);
