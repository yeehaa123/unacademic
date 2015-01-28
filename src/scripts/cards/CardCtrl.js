import _ from 'lodash';

export default CardCtrl;

function CardCtrl(dispatcher){
  let card = _.extend(this, this.model);

  card.goTo = function(mode, model){
    let name = model.resourceName;
    let state = { mode: mode, view: { name: name, [name]: model.id } };
    dispatcher.setState(state);
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
