export default MainCtrl;

function MainCtrl(init, dispatcher) {
  let vm = this;

  dispatcher.registerObserverCallback(updateInfo);

  function updateInfo(params){
    init[params.view.name].resolver(params)
      .then((data) => {
        vm.model = data;
        vm.mode = params.mode;
        vm.user = params.user;
      });
  }
};
