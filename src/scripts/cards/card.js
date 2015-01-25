export default card;

let templateUrl = './scripts/cards/card.html';

function card(){
  return {
    templateUrl: templateUrl,
    restrict: 'E',
    replace: true,
    scope: {
      card: '='
    },

    // move this to separate controller
    controller: function($scope, dispatcher){

      // move this function to decorator on cards

      $scope.card.goTo = function(mode, model){
        dispatcher.setState({

          // pass this in as argument
          mode: mode,

          // should be resolved from model name
          view: 'course',
          resource: {
            curator: model.curator,
            id: model.id
          }
        });
      }
    }
  }
}
    // controller: function($scope){
    //
    //   $scope.getTemplateUrl = function(){
    //     var template;
    //     if($scope.model instanceof Path){
    //       template = 'pathCard.tpl.html';
    //     } else {
    //       template = 'card.tpl.html';
    //     }

    //     return template;
    //   }


