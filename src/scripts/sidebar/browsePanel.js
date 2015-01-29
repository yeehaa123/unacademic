export default browsePanel;

function browsePanel(){
  return {
    template: '<div ng-include="browsePanel.getTemplateUrl()"></div>',
    replace: true,
    scope: {
      model: '='
    },

    bindToController: true,
    controllerAs: 'browsePanel',
    controller: function(){
      let browsePanel = this;
      browsePanel.getTemplateUrl = function(){
        let modelName = browsePanel.model.constructor.name;
        let name = modelName.toLowerCase();
        let template =  `./scripts/content/${name}/panels/browse.html`;
        return template;
      }
    } 
  }
};
