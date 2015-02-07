import _ from 'lodash';

export default CardCtrl;

function CardCtrl(dispatcher){
  let vm = this;
  vm.type = vm.model.resourceName;
  vm.browse = browse;
  vm.learn = learn;
  vm.getTemplateUrl = getTemplateUrl;

  function browse(){
    let name = vm.model.resourceName;
    let { id, curator } = vm.model;
    let state = { view: { name, [name]: id, curator} };
    dispatcher.setState(state);
  }


  function learn(){
    let user = dispatcher.getState().user;
    vm.model.constructor.clone(user, vm.model).then((data) => {
      let { id, curator, resourceName:name } = data;
      let view = { name, curator, [name]: id };
      dispatcher.setState({view});
    });
  }

  function getTemplateUrl(type, mode){
    let name = type.toLowerCase();
    let template =  `./scripts/content/${name}/cards/${mode}.html`;
    return template;
  }
}
