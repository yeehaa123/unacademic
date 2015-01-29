export default curatePanel;

function curatePanel(){
  return {
    template: '<div ng-include="curatePanel.getTemplateUrl()"></div>',
    replace: true,
    scope: {
      model: '='
    },

    bindToController: true,
    controllerAs: 'curatePanel',
    controller: 'CuratePanelCtrl'
  }
};
