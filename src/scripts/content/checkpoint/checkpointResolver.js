export default checkpointResolver;

function checkpointResolver($q, Checkpoint){

  return data;

  /// revise tests

  function data({user, view: {curator, checkpoint, waypoint}}){

    return $q((resolve, reject) => {

      if(!user && !curator){ 
        return reject(); 
      }

      if(checkpoint === 'new'){
        console.log(waypoint);
        return resolve({model: new Checkpoint(waypoint), collection: []});
      }

      Checkpoint.get(curator, checkpoint)
        .then((response) => {
          resolve({model: response, collection: []})
        });
    });
  }
}
