import _ from 'lodash';

export default permission;

function permission($log, resourceHelpers) {
  var modes = ['browsing', 'learning', 'curation'];

  return {
    get: get
  }

  function get(currentState, changes) {
    let proposal = createProposal(currentState, changes)
    var valid = checkPermissions(currentState, proposal);

    if(!valid){
      return {};
    }

    var intersection =  _.omit(proposal, function(value, key){
      return _.isEqual(currentState[key], value);
    });

    delete intersection.queue;

    if(!_.isEmpty(intersection)){
      let user = intersection.user || currentState.user;
      let viewState = resourceHelpers.createViewState(intersection.view, currentState.view, user);
      intersection.view = viewState;
    }


    return intersection;
  }

  function createProposal(currentState, changes){
    let modules = ["mode", "view", "user", "queue"]
    let state = _.clone(currentState);

    _.each(modules, (module) => {
      if(changes[module]){
        state[module] = changes[module];
      }
    });
    return state;
  }

  function checkPermissions(currentState, nextState){

    if(nextState.queue.size > 0){
      $log.warn('app is locked');
      return false;
    }

    if(!_.contains(modes, nextState.mode)){
      $log.warn('invalid appmode');
      return false;
    }

    if((nextState.mode === 'curation' || nextState.mode === 'learning') && !nextState.user){
      $log.warn('curation and learning mode are only accessible after signing in')
      return false;
    }

    return true;
  }
}
