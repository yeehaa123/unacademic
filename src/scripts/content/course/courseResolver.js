export default courseResolver;
import _ from 'lodash';

function courseResolver($q, Course, $http){

  return data;

  function data({curator, id}){
    let schema = Course.schema;
    let curatorId;
    let courseId;

    if(curator){
      curatorId = curator;
    }

    if(id){
      courseId = id;
    }

    return $q((resolve, reject) => {

      if(!curatorId){
        return reject();
      }

      if(curatorId && courseId === 'new'){
        let course = new Course();
        return resolve({schema: schema, info: course, cards: course.waypoints});
      }

      // all temporary...

      Course.get(curatorId, courseId)
        .then(getWaypoints)
        .then((data) => {
          let info = data.info;
          let cards = data.waypoints;
          return resolve({info, schema, cards});
        });


      function getWaypoints(data){
        return $q((resolve, reject) => {
          let info = data;

          // to waypoints service
          // Waypoints.get([waypoint]);

          let promises = _.map(info.waypoints, (waypoint) => {
            let url = `https://cth-curriculum.firebaseio.com/waypoints/yeehaa/${waypoint}.json`;
            return $http.get(url);
          });

          $q.all(promises).then((responses) => {
            let waypoints = _.map(responses, (response) => { return response.data });
            resolve({info, waypoints})
          });
        });
      }
    });
  }
}
