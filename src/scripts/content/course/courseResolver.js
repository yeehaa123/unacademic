export default courseResolver;

function courseResolver($q, Course, Waypoint){

  return data;

  /// revise tests

  function data({view: {curator, course}}){

    return $q((resolve, reject) => {

      if(!curator){ 
        return reject(); 
      }

      if(curator && course === 'new'){
        return resolve(new Course());
      }

      Course.get(curator, course)
        .then(Course.getWaypoints)
        .then((response) => {
          resolve({model: response.course, collection: response.waypoints})
        });
    });
  }
}
