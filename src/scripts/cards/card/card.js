import _ from 'lodash';

export default CardCtrl;

function CardCtrl(dispatcher){
  let vm = this;

  vm.browse = function(){
    let name = vm.model.resourceName;
    let { id, curator } = vm.model;
    let state = { view: { name, [name]: id, curator} };
    dispatcher.setState(state);
  }

  vm.learn = function(){
    let user = dispatcher.getState().user;
    vm.model.constructor.clone(user, vm.model).then((data) => {
      let { id, curator, resourceName:name } = data;
      let view = { name, curator, [name]: id };
      dispatcher.setState({view});
    });
  }
}
