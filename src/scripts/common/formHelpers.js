export default formHelpers;

function formHelpers(dispatcher){

  return {
    submit: submit,
    checkForm: checkForm
  };

  function submit(form, model){
    if(!form.$dirty){
      return dispatcher.setState({mode: 'learn'});
    }

    if(form.$dirty && form.$valid){
      form.$setPristine();
      model.save()
        .then(success, error);
    }

    function success(){
      dispatcher.queue({remove: model.id});
      dispatcher.setState({
        mode: 'learn', 
        view: {
          name: model.resourceName,
          curator: model.curator,
          [model.resourceName]: model.id
        }
      });
    }

    function error(){
      form.$setDirty();
    }
  }

  function checkForm(form, modelId){
    if(!!form.$dirty){
      dispatcher.queue({add: modelId});
    }
  }
}
