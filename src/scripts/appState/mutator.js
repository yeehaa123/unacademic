export default mutator;

function mutator(currentState, switcher, history){
  return {
    set: set
  }

  function set(changes){
    return new Promise(function(resolve, reject){
      switcher.set(changes)
        .then(function(){
          setCurrentState(changes);
          let state = currentState.get();
          history.add(state);
          resolve(state)
        })
        .catch(function(err){
          // set(changes);
          reject("this is groundcontrol")
        });
    });
  }

  function setCurrentState(changes){
    currentState.set(changes);
  }
};
