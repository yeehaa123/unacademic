import _ from 'lodash';

export default proposal;

function proposal(){

  return {
    create: create
  }

  function create(currentState, changes){
    let modules = ["mode", "view", "user", "queue"]
    let state = _.clone(currentState);

    _.each(modules, (module) => {
      if(changes[module]){
        state[module] = changes[module];
      }
    });
    return state;
  }
}
