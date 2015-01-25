export default navHelpers;

function navHelpers(dispatcher, history){

  return {
    goTo: goTo,
    goBack: goBack,
    goForward: goForward,
    canGoBack: canGoBack,
    canGoForward: canGoForward
  };

  function goBack(){
    let previous = history.previous();
    if(previous){
      dispatcher.setState(previous);
    }
  }

  function canGoBack(){
    let status = history.status();
    if(status.index < status.length){
      return true;
    }
    return false;
  }

  function canGoForward(){
    let status = history.status();
    if(status.index > 0){
      return true;
    }
    return false;
  }

  function goForward(){
    let next = history.next();
    if(next){
      dispatcher.setState(next);
    }
  }

  function goTo(view, resource){

    if(!resource){
      resource = createNewResource();
    }

    dispatcher.setState({
      view: view,
      resource: {
        id: resource.id,
        curator: resource.curator
      }
    });
  }

  function createNewResource(){
    return {
      id: 'new',
      curator: dispatcher.getState().user
    };
  }
}
