export default coverResolver;

function coverResolver($q, Cover, Course, dispatcher){

  return data;

  function data(){
    let userId = dispatcher.getState().user;

    let coverUser = userId || 'general';

    return $q(function(resolve, reject){
      let promises = [
        Cover.get(coverUser, 'info'),
        Course.getAll(userId)
      ];

      $q.all(promises).then(function(data){
        let name = 'cover';
        let info = data[0];
        let cards = data[1];
        let schema = Cover.schema;
        return resolve({name, info, schema, cards});
      });
    });
  }
}
