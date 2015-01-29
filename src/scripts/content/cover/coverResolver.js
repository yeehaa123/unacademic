export default coverResolver;

function coverResolver(Cover){

  return data;

  function data({user}){
    let coverUser = user || 'general';
    return Cover.get(coverUser, 'info');
  }
}
