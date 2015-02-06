export default waypointsResolver;

function waypointsResolver(Waypoint, Cover, $q){

  return data;

  function data({user, mode}){
    return $q((resolve, reject) => {
      let coverUser = user;
      let waypointUser = user;


      if(mode === 'browse'){
        coverUser = 'general';
        waypointUser = undefined;
      }

      let promises = [
        Cover.get(coverUser, 'info'),
        Waypoint.getAll(waypointUser)
      ];
      
      $q.all(promises).then((data) => {
        let model = data[0].cover || new Cover(Cover.initData);
        let collection = data[1] || [];
        resolve({model, collection});
      });
    });
  }
}
