export default routes;

/*@ngInject*/

let templateUrl = './scripts/content/views/index.html';

function routes($stateProvider) {
  $stateProvider
    .state('waypoints', {
      url: '/waypoints',
      controller: 'WaypointsCtrl',
      controllerAs: 'vm',
      templateUrl: templateUrl
    })
};
