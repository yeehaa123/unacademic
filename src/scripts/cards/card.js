export default card;

let templateUrl = './scripts/cards/templates/card.html';

function card(){
  return {
    templateUrl: templateUrl,
    restrict: 'E',
    replace: true,
    scope: {
      model: '='
    },
    bindToController: true,
    controllerAs: 'card',
    controller: 'CardCtrl'
  }
}
