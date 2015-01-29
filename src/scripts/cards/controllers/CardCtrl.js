import _ from 'lodash';

export default CardCtrl;

function CardCtrl(dispatcher){
  let card = _.extend(this, this.model);

  card.goTo = function(mode, { resourceName: name, id, curator }){
    let state = { 
      mode: mode, 
      view: { name, [name]: id, curator } 
    };
    dispatcher.setState(state);
  }
}
