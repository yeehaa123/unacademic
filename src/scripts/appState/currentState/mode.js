export default mode;

function mode(){
  var mode = 'browsing';

  return {
    name: 'mode',
    get: get,
    set: set,
  }

  function get(){
    return mode;
  }

  function set(nextMode){
    mode = nextMode;
  }
};
