export default routes;

/*@ngInject*/

let templateUrl = './scripts/content/views/index.html';

function routes($stateProvider) {
  $stateProvider
    .state('cover', {
      url: '/cover',
      controller: 'CoverCtrl',
      controllerAs: 'vm',
      templateUrl: templateUrl
    })
};
