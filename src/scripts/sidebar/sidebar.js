export default sidebar;

let templateUrl = './scripts/sidebar/views/sidebar.html';

function sidebar(){
  return {
    templateUrl: templateUrl,
    replace: true,
    scope: {
      model:  '=',
      schema: '=',
      form:   '=',
      learn:  '=',
      curate: '=',
      submit: '&'
    },
    bindToController: true,
    controllerAs: 'sidebar',
    controller: 'SidebarCtrl'
  }
};

