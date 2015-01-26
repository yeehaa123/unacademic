export default MainCtrl;

function MainCtrl(init, dispatcher, data) {

  let vm = this;
  initialize();

  function initialize(){
    vm.viewName = data.info.constructor.name.toLowerCase();
    vm.info = data.info;
    vm.cards = data.cards;
    dispatcher.registerObserverCallback(updateInfo);
  }

  function updateInfo(params){
    init[vm.viewName].resolver(params)
      .then(({info, cards}) => {
        vm.info = info;
        vm.cards = cards;
      })
  }
};
