export default mode;

function mode(){
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
