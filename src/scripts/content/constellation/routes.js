export default routes;

/*@ngInject*/

let templateUrl = './scripts/content/views/index.html';

function routes($stateProvider) {
  $stateProvider
    .state('constellation', {
      url: '/constellation',
      controller: 'ConstellationCtrl',
      controllerAs: 'vm',
      templateUrl: templateUrl
    })
};
