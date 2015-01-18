export default routes;

/*@ngInject*/

let template = require('./views/index.html');

function routes($stateProvider) {
  $stateProvider
    .state('cover', {
      url: '/cover',
      controller: 'MainCtrl',
      controllerAs: 'vm',
      template: template,
      resolve: {
        data: function(init){
          return init.cover.resolver();
        }
      }
    })

    .state('course', {
      url: '/course/:curator/:id',
      controller: 'MainCtrl',
      controllerAs: 'vm',
      templateUrl: template,
      resolve: {
        data: function(init, $stateParams){
          var params = $stateParams
          return init.course.resolver(params);
        }
      }
    })
};
