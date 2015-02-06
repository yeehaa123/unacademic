export default waypointResolver;

function waypointResolver($q, Waypoint){

  return data;

  /// revise tests

  function data({user, view: {curator, waypoint}}){

    return $q((resolve, reject) => {

      if(!user && !curator){ 
        return reject(); 
      }

      if(waypoint === 'new'){
        return resolve({model: new Waypoint(), collection: []});
      }

      Waypoint.get(curator, waypoint)
        .then((response) => {
          resolve({model: response, collection: response.checkpoints})
        });
    });
  }
}
