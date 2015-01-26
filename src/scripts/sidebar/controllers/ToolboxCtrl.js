import _ from 'lodash';

export default ToolboxCtrl;

function ToolboxCtrl(dispatcher, navHelpers){

  let toolbox = this;
  let currentMode;
  initialize();

  function initialize(){
    let state = dispatcher.getState();
    let modes = dispatcher.getModes(); 
    currentMode = state.mode;
    initToolbox(state, modes);
    dispatcher.registerObserverCallback(updateAppState);
  }

  function initToolbox({mode, user}, modes){
    toolbox.modes = modes;
    toolbox.user = user;
    toolbox.mode = mode;
    toolbox.back = back;
    toolbox.forward = forward;
    toolbox.signIn = signIn;
    toolbox.checkMode = checkMode;
  }

  function back(){
    navHelpers.goBack();
  }

  function forward(){
    navHelpers.goForward();
  }

  function signIn(){
    let users = ['yeehaa'];
    let user = _.sample(users);
    return dispatcher.setState({user: user, mode: 'learning'});
  }

  function checkMode(newMode){
    toolbox.mode = currentMode;
    dispatcher.setState({mode: newMode});
  }

  function updateAppState(state){
    toolbox.user = state.user;
    currentMode = state.mode;
    toolbox.mode = state.mode;
  }
}
