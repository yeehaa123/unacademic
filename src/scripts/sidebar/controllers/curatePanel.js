export default CuratePanelCtrl;

function CuratePanelCtrl($scope, formHelpers, resourceHelpers){
  let curatePanel = this;
  init();

  function init(){
    curatePanel.form = {};
    curatePanel.getTemplateUrl = getTemplateUrl;
    curatePanel.submit = () => formHelpers.submit(curatePanel.form, curatePanel.model);
    curatePanel.addNew = () => resourceHelpers.addNewChild(curatePanel.model); 
    let checkForm = ()=> formHelpers.checkForm(curatePanel.form, curatePanel.model.id);
    $scope.$watch('curatePanel.form', checkForm, true);
  }

  function getTemplateUrl(){
    let name = curatePanel.model.resourceName.toLowerCase();
    let template =  `./scripts/content/${name}/panels/curate.html`;
    return template;
  }
} 
