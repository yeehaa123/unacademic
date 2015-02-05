import _ from 'lodash';

export default Rules;

function Rules($log, appModes){
  let modes = appModes;

  return {
    check: check
  }

  function check(nextState){

    if(nextState.queue && nextState.queue.size > 0){
      $log.warn('app is locked');
      return false;
    }

    if(nextState.mode && !_.contains(modes, nextState.mode)){
      $log.warn('invalid appmode');
      return false;
    }

    if(nextState.mode === 'curate' || nextState.mode === 'learn'){
      if(!nextState.user){
        $log.warn('curation and learning mode are only accessible after signing in')
        return false;
      }

      // needs to be refactored...

      let resource = nextState.view.course || nextState.view.waypoint;

      if(resource && resource !== 'new' && nextState.user !== nextState.view.curator){
        $log.warn('you don\'t curate this resource');
        return false;
      }
    }

    return true;
  }
}
