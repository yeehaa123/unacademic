export default CuratePanelCtrl;

function CuratePanelCtrl($scope, dispatcher, formHelpers){
  let curatePanel = this;
  init();

  function init(){
    curatePanel.form = {};
    curatePanel.getTemplateUrl = getTemplateUrl;
    curatePanel.submit = () => formHelpers.submit(curatePanel.form, curatePanel.model);
    curatePanel.addNew = () => addNew(curatePanel.model); 
    let checkForm = ()=> formHelpers.checkForm(curatePanel.form, curatePanel.model.id);
    $scope.$watch('curatePanel.form', checkForm, true);
  }

  function addNew(model){
    if(model.constructor.name === 'Course'){
      dispatcher.setState({resource: {course: model.id}});
    }
    model.addNewChild();
  }

  function getTemplateUrl(){
    let modelName = curatePanel.model.constructor.name;
    let name = modelName.toLowerCase();
    let template =  `./scripts/content/${name}/panels/curate.html`;
    return template;
  }
} 
