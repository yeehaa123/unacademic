export default history;

function history(){
  let history;
  let index;

  return {
    initialize: initialize,
    get: get,
    add: add,
    status: status,
    previous: previous,
    next: next
  };

  function next(){
    if(index > 0){
      index -= 1;
    }
    return history[index];
  }

  function previous(){
    if(index < history.length - 1){
      index += 1;
    }
    return history[index];
  }

  function get(){
    return history;
  }

  function status(){
    let length = history.length;
    return {length, index};
  }

  function initialize(){
    history = [];
    index = 0;
  }

  function add(state){
    if(!state.timestamp){
      history = shortenHistory(history);
      state.timestamp = Date.now();
      history.unshift(state);
      index = 0;
    }
  }

  function shortenHistory(history){
    return history.slice(index, history.length);
  }
}
