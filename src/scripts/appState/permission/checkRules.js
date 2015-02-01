import _ from 'lodash';

export default Rules;

function Rules($log){
  let modes = ['browsing', 'learning', 'curation'];

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

    if(nextState.mode === 'curation' || nextState.mode === 'learning'){
      if(!nextState.user){
        $log.warn('curation and learning mode are only accessible after signing in')
        return false;
      }

      if(nextState.user !== nextState.view.curator){
        $log.warn('you don\'t curate this resource');
        return false;
      }
    }

    return true;
  }
}
