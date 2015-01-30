import _ from 'lodash';

export default CardCtrl;

function CardCtrl(dispatcher){
  let vm = this;

  vm.browse = function(){
    let name = vm.model.resourceName;
    let curator = vm.model.curator;
    let id = vm.model.id;

    let state = { view: { name, [name]: id, curator} };
    dispatcher.setState(state);
  }

  vm.learn = function(){
    let Constructor = vm.model.constructor;
    let name = vm.model.resourceName;
    let clone = new Constructor(vm.model);

    clone.curator = vm.user;
    clone.save().then(({data: {curator, id}}) => {
      let view = { name, curator, [name]: id };
      dispatcher.setState({view});
    });
  }
}
