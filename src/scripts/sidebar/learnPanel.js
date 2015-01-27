export default learnPanel;
import _ from 'lodash';

function learnPanel(){
  return {
    template: '<div ng-include="learnPanel.getTemplateUrl()"></div>',
    replace: true,
    scope: {
      model: '='
    },

    bindToController: true,
    controllerAs: 'learnPanel',
    controller: function(){
      let learnPanel = this;

      learnPanel.getTemplateUrl = function(){
        let modelName = learnPanel.model.constructor.name;
        let name = modelName.toLowerCase();
        let template =  `./scripts/content/${name}/panels/learn.html`;
        return template;
      }
    } 
  }
};
