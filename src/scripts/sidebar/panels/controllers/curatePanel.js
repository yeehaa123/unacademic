export default CuratePanelCtrl;

function CuratePanelCtrl($scope, dispatcher, formHelpers, resourceHelpers){
  let curatePanel = this;
  init();

  function init(){
    curatePanel.form = {};
    curatePanel.getTemplateUrl = getTemplateUrl;
    curatePanel.submit = () => formHelpers.submit(curatePanel.form, curatePanel.model);
    curatePanel.addNew = addNew;
    curatePanel.keywords = ['html', 'css', 'markdown'];

    let checkForm = () => {
      formHelpers.checkForm(curatePanel.form, curatePanel.model.id)
    };

    $scope.$watch('curatePanel', checkForm, true);
  }

  function addNew(){
    let curator = dispatcher.getState().user;
    let resourceName = curatePanel.model.resourceName;
    let childName = resourceHelpers.getChildName(resourceName);
    let viewState = { curator, name:  childName, [childName]: 'new' }
    dispatcher.setState({view: viewState});
  }

  function getTemplateUrl(){
    let name = curatePanel.model.resourceName.toLowerCase();
    let template =  `./scripts/content/${name}/panels/curate.html`;
    return template;
  }
} 
