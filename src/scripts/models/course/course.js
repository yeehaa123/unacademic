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
      return super.clone(userId, instance)
        .then(getWaypoints)
        .then(cloneWaypoints)
        .then(createCourse);
    }
  }

  function cloneWaypoints({waypoints, course}){
    return $q((resolve, reject) => {
      _.each(waypoints, (waypoint) => {
        Waypoint.clone(course.curator, waypoint);
      });
      resolve({waypoints, course});
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
