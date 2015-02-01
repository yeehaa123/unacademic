export default CourseInit;
import _ from 'lodash';

function CourseInit($q, BaseClass, Waypoint, schema, initData){

  class Course extends BaseClass {
    static get(userId, id){
      return super.get(userId, id)
        .then(getWaypoints)
        .then(createCourse);
    }

    static clone(userId, instance){
      let promises = [
        getWaypoints(instance),
        super.clone(userId, instance)
      ];

      return $q.all(promises).then(cloneWaypoints);
    }
  }

  function cloneWaypoints([{waypoints}, course]){
    return $q((resolve, reject) => {
      _.each(waypoints, (waypoint) => {
        Waypoint.clone(course.curator, waypoint);
      });
      resolve(course);
    });
  }

  function createCourse({waypoints, course}) {
    return $q((resolve, reject) => {
      course.waypoints = waypoints;
      resolve(course);
    });
  }

  function getWaypoints(course){
    return $q((resolve, reject) => {
      let user;
      if(course.waypoints){
        Waypoint.get(course.curator, course.waypoints)
          .then((waypoints) => {
            resolve({waypoints, course});
          });
      } else {
        let waypoints = [];
        resolve({waypoints, course});
      }
    });
  };

  Course.initialize({schema: schema, initData: initData});

  return Course;
};
