import browsePanel from './browsePanel';
import learnPanel from './learnPanel';
import curatePanel from './curatePanel';

import CuratePanelCtrl from './controllers/curatePanel';

let app = angular.module('unacademic.sidebar.panels', []);

app.controller('CuratePanelCtrl', CuratePanelCtrl);
app.directive('browsePanel', browsePanel);
app.directive('learnPanel', learnPanel);
app.directive('curatePanel', curatePanel);
