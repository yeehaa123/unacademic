export default currentView;

function currentView(){

  let view = '';

  return {
    name: 'view',
    get: get,
    set: set
  }

  function get(){
    return view;
  }

  function set(newView){
    view = newView;
    return true;
  }
};
