import _ from 'lodash';

export default CardCtrl;

function CardCtrl(dispatcher){
  let card = _.extend(this, this.model);

  card.goTo = function(mode, model){
    let view = model.constructor.name.toLowerCase();
    dispatcher.setState({
      mode: mode,
      view: view,
      resource: {
        curator: model.curator,
        id: model.id
      }
    });
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
