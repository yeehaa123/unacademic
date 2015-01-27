export default MainCtrl;

function MainCtrl(init, dispatcher, data) {

  let vm = this;
  initialize();

  function initialize(){
    vm.viewName = data.constructor.name.toLowerCase();
    vm.info = data;

    if(data.courses){
      vm.cards = data.courses;
    }
    if(data.waypoints){
      vm.cards = data.waypoints;
    }

    dispatcher.registerObserverCallback(updateInfo);
  }

  function updateInfo(params){
    init[vm.viewName].resolver(params)
      .then((data) => {
        vm.info = data;
        if(data.courses){
          vm.cards = data.courses;
        }
        if(data.waypoints){
          vm.cards = data.waypoints;
        }
      });
  }
};
