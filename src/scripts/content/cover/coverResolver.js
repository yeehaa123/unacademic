export default coverResolver;

function coverResolver($q, Cover, Course, dispatcher){

  return data;

  function data(){
    let userId = dispatcher.getState().user;
    let coverUser = userId || 'general';
    return Cover.get(coverUser, 'info');
  }
}
