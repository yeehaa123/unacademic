export default sidebar;

let templateUrl = './scripts/sidebar/views/sidebar.html';

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
