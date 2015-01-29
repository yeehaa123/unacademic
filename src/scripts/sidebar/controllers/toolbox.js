import _ from 'lodash';

export default ToolboxCtrl;

function ToolboxCtrl($scope, dispatcher, navHelpers){

  let toolbox = this;
  let currentMode; 
  initialize();


  function initialize(){
    let modes = dispatcher.getModes(); 
    initToolbox(modes);

    $scope.$watch('toolbox.dmode', (newVal, oldVal) => {
      toolbox.mode = newVal;
      currentMode = newVal;
    });
  }

  function initToolbox(modes){
    toolbox.modes = modes;
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
    let users = ['yeehaa', 'reika', 'marijn', 'peter', 'nigel'];
    let user = _.sample(users);
    console.log(user);
    return dispatcher.setState({user: user});
  }

  function checkMode(newMode, oldMode){
    toolbox.mode = currentMode;
    dispatcher.setState({mode: newMode});
  }
}
