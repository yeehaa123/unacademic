export default switcher;

function switcher($state, $q){
  return {
    set: set
  };

  function set({view, resource}){
    if(view || resource){
      // needs to be tested...
      resource = resource || { curator: 'yeehaa', id: 'new' }
      return $state.go(view, resource);
    }
    return $q.when('no route change');
  };
}
