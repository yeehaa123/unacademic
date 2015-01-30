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
    vm.model.constructor.clone(vm.model).then(({data}) => {
      let { id, curator, resourceName:name } = data;
      console.log(id, curator, name);
      let view = { name, curator, [name]: id };
      dispatcher.setState({view});
    });
  }
}
