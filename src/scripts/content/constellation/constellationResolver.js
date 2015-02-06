export default constellationResolver;

function constellationResolver($q, Constellation, Waypoint){

  return data;

  /// revise tests

  function data({user, view: {curator, constellation}}){

    return $q((resolve, reject) => {

      if(!user && !curator){ 
        return reject(); 
      }

      if(constellation === 'new'){
        return resolve({model: new Constellation(), collection: []});
      }

      Constellation.get(curator, constellation)
        .then(Constellation.getWaypoints)
        .then((response) => {
          resolve({model: response.constellation, collection: response.waypoints})
        });
    });
  }
}
