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

    .state('course', {
      url: '/course/:curator/:course',
      controller: 'MainCtrl',
      controllerAs: 'vm',
      templateUrl: templateUrl
    })
};
