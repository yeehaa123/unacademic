export default currentView;

function currentView(){

  let name = '';

  return {
    name: 'name',
    get: get,
    set: set
  }

  function get(){
    return name = name;
  }

  function set(newName){
    name = newName;
    return true;
  }
};
