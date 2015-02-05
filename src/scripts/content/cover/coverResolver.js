export default coverResolver;

function coverResolver(Cover, $q){

  return data;

  function data({user, mode}){
    return $q((resolve, reject) => {
      let coverUser = user;

      if(mode === 'browse'){
        coverUser = 'general';
      }

      Cover.get(coverUser, 'info').then((data) => {
        let model = data.cover || new Cover(Cover.initData);
        let collection = data.courses || [];
        resolve({model, collection});
      });
    });
  }
}
