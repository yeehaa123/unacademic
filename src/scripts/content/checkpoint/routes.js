export default routes;

/*@ngInject*/

let templateUrl = './scripts/content/views/index.html';

function routes($stateProvider) {
  $stateProvider
    .state('checkpoint', {
      url: '/waypoint/:curator/:waypoint/:checkpoint',
      controller: 'CheckpointCtrl',
      controllerAs: 'vm',
      templateUrl: templateUrl
    })
};

