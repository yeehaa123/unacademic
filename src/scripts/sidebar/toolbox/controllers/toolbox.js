import _ from 'lodash';

export default ToolboxCtrl;

function ToolboxCtrl($scope, dispatcher, navHelpers, appModes){

  let toolbox = this;
  let currentMode; 
  initialize();


  function initialize(){
    toolbox.modes = appModes; 
    $scope.$watch(() => toolbox.mode , setMode);
    initButtons();
  }

  function initButtons(){
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
    let users = ['reika'];
    let user = _.sample(users);
    console.log(user);
    return dispatcher.setState({user: user});
  }

  function setMode(newVal, oldVal){
    toolbox.buttonMode = newVal;
    currentMode = newVal;
  }

  function checkMode(newMode, oldMode){
    toolbox.buttonMode = currentMode;
    dispatcher.setState({mode: newMode});
  }
}
