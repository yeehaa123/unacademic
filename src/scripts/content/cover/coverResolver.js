export default coverResolver;

function coverResolver(Cover, dispatcher){

  return data;

  function data(){
    let userId = dispatcher.getState().user;
    let coverUser = userId || 'general';
    return Cover.get(coverUser, 'info');
  }
}
