export default switcher;

function switcher($state, $q){
  return {
    set: set
  };

  function set({view, resource}){
    if(name || resource){
      return $state.go(view, resource);
    }
    return $q.when('no route change');
  };
}
