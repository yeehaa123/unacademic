import _ from 'lodash';

export default dispatcher;

function dispatcher(currentState, queue, permission, mutator){
  let observerCallbacks = [];
  let modes = ['browsing', 'learning', 'curation'];

  return {
    getState: get,
    setState: set,
    getModes: getModes,
    queue: setQueue,
    registerObserverCallback: registerObserverCallback
  }

  function get(){
    return currentState.get();
  }

  function set(proposals){
    let state = get();
    state.queue = queue.get();

    let changes = permission.get(state, proposals);

    if(!_.isEmpty(changes)){
      mutator.set(changes).then((data) => { notifyObservers(data); });
    }
  }

  function getModes(){
    return modes;
  }

  function setQueue(options){
    return queue.set(options);
  }

  function registerObserverCallback(callback){
    observerCallbacks.push(callback);
  }

  function notifyObservers(msg){
    _.each(observerCallbacks, function(callback){
      callback(msg);
    });
  };
};
