export default cards;
import CardsCtrl from './cards';

let templateUrl = './scripts/cards/cards/cards.html';

function cards(){
  return {
    templateUrl: templateUrl,
    replace: true,
    scope: {
      model:      '=',
      collection: '=',
      mode:       '=',
      user:       '='
    },
    bindToController: true,
    controllerAs: 'cards',
    controller: CardsCtrl 
  }
};
