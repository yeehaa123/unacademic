export default routes;

/*@ngInject*/

let templateUrl = './scripts/content/views/index.html';

function routes($stateProvider) {
  $stateProvider
    .state('cover', {
      url: '/cover',
      controller: 'MainCtrl',
      controllerAs: 'vm',
      templateUrl: templateUrl,
      resolve: {
        data: function(init){
          return init.cover.resolver();
        }
      }
    })

    .state('course', {
      url: '/course/:curator/:course',
      controller: 'MainCtrl',
      controllerAs: 'vm',
      templateUrl: templateUrl,
      resolve: {
        data: function(init, $stateParams){
          var params = $stateParams
          return init.course.resolver(params);
        }
      }
    })
};
