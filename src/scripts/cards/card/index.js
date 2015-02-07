export default card;
import CardCtrl from './card';

function card(){
  return {
    template: '<div ng-include="card.getTemplateUrl(card.type, card.mode)"></div>',
    restrict: 'E',
    replace: true,
    scope: {
      model: '=',
      user: '=',
      mode: '='
    },
    bindToController: true,
    controllerAs: 'card',
    controller: CardCtrl
  }
}
