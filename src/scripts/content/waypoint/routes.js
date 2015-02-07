export default routes;

/*@ngInject*/

let templateUrl = './scripts/content/views/index.html';

function routes($stateProvider) {
  $stateProvider
    .state('waypoint', {
      url: '/waypoint',
      controller: 'WaypointCtrl',
      controllerAs: 'vm',
      templateUrl: templateUrl
    })
};
