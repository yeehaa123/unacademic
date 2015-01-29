export default toolbox;

let templateUrl = './scripts/sidebar/templates/toolbox.html';

function toolbox(){
  return {
    templateUrl: templateUrl,
    replace: true,
    scope: {
      mode: '=',
      user: '='
    },
    bindToController: true,
    controllerAs: 'toolbox',
    controller: 'ToolboxCtrl'
  }
};
