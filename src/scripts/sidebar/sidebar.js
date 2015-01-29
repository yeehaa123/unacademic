export default sidebar;

let templateUrl = './scripts/sidebar/templates/sidebar.html';

function sidebar(){
  return {
    templateUrl: templateUrl,
    replace: true,
    scope: {
      model:   '=',
      mode: '=',
      user: '='
    },
    bindToController: true,
    controllerAs: 'sidebar',
    controller: 'SidebarCtrl'
  }
};
