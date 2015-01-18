export default sidebar;

let template = require('./views/sidebar.html');

function sidebar(){
  return {
    template: template,
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
