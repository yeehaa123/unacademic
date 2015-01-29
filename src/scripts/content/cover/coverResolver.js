export default coverResolver;

function coverResolver(Cover, $q){

  return data;

  function data({user, mode}){
    return $q((resolve, reject) => {
      let coverUser = user;

      if(mode === 'browsing'){
        coverUser = 'general';
      }

      Cover.get(coverUser, 'info').then((data) => {
        let model = data.cover;
        let collection = data.courses;
        resolve({model, collection});
      });
    });
  }
}
