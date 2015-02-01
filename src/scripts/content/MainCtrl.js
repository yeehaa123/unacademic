export default MainCtrl;

function MainCtrl(init, dispatcher) {
  let vm = this;

  dispatcher.registerObserverCallback(updateInfo);

  function updateInfo(params){
    init[params.view.name].resolver(params)
      .then(({model, collection}) => {
        console.log(model, collection);
        vm.model          = model;
        vm.collection     = collection;
        vm.mode           = params.mode;
        vm.user           = params.user;
      });
  }
};
