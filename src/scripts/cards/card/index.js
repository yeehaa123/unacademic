export default card;
import CardCtrl from './card';

let templateUrl = './scripts/cards/card/card.html';

function card(){
  return {
    templateUrl: templateUrl,
    restrict: 'E',
    replace: true,
    scope: {
      model: '=',
      user: '='
    },
    bindToController: true,
    controllerAs: 'card',
    controller: CardCtrl
  }
}
