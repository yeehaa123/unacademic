export default user;

function user(){

  var userId;

  return {
    name: 'user',
    get: get,
    set: set,
  }

  function get(){
    return userId;
  }

  function set(newId){
    userId = newId;
    return true;
  }
};
