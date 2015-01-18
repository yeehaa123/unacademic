export default card;

let template = require('./card.html');
function card(){
  return {
    template: template,
    restrict: 'E',
    replace: true,
    scope: {
      card: '='
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


