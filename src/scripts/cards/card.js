export default card;

let templateUrl = './scripts/cards/card.html';

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
