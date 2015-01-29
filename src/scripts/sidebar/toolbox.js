export default toolbox;

let templateUrl = './scripts/sidebar/views/toolbox.html';

function toolbox(){
  return {
    templateUrl: templateUrl,
    replace: true,
    scope: {
      dmode: '=',
      user: '='
    },
    bindToController: true,
    controllerAs: 'toolbox',
    controller: 'ToolboxCtrl'
  }
};
