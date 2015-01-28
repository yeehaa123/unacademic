export default switcher;

function switcher($state, $q){
  return {
    set: set
  };

  function set({view}){
    if(view){
      return $state.go(view.name, view);
    }
    return $q.when('no route change');
  };
}
