export default routes;

/*@ngInject*/

let templateUrl = './scripts/content/views/index.html';

function routes($stateProvider) {
  $stateProvider
    .state('cover', {
      url: '/cover',
      controller: 'MainCtrl',
      controllerAs: 'vm',
      templateUrl: templateUrl
    })

    .state('constellation', {
      url: '/constellation/:curator/:constellation',
      controller: 'MainCtrl',
      controllerAs: 'vm',
      templateUrl: templateUrl
    })

    .state('waypoints', {
      url: '/waypoints',
      controller: 'MainCtrl',
      controllerAs: 'vm',
      templateUrl: templateUrl
    })

    .state('waypoint', {
      url: '/waypoint',
      controller: 'MainCtrl',
      controllerAs: 'vm',
      templateUrl: templateUrl
    })
};
