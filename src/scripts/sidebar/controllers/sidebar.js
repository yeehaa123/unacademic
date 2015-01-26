export default SidebarCtrl;

function SidebarCtrl(dispatcher){
  let sidebar = this;
  init();

  function init(){
    sidebar.mode = dispatcher.getState().mode;
    dispatcher.registerObserverCallback(function(state){
      sidebar.mode = state.mode;
    });
  };
}
