export default CuratePanelCtrl;

function CuratePanelCtrl($scope, formHelpers){
  let curatePanel = this;
  init();

  function init(){
    curatePanel.form = {};
    curatePanel.getTemplateUrl = getTemplateUrl;
    curatePanel.submit = () => formHelpers.submit(curatePanel.form, curatePanel.model);
    let checkForm = ()=> formHelpers.checkForm(curatePanel.form, curatePanel.model.id);
    $scope.$watch('curatePanel.form', checkForm, true);
  }

  function getTemplateUrl(){
    let modelName = curatePanel.model.constructor.name;
    let name = modelName.toLowerCase();
    let template =  `./scripts/content/${name}/curatePanel.html`;
    return template;
  }
} 
