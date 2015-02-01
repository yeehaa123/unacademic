export default CourseInit;
import _ from 'lodash';

function CourseInit($q, BaseClass, Waypoint, schema, initData){

  class Course extends BaseClass {

    static clone(userId, instance){
      let promises = [
        this.getWaypoints(instance),
        super.clone(userId, instance)
      ];

      return $q.all(promises).then(cloneWaypoints);
    }

    static getWaypoints(course){
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

  Course.initialize({schema: schema, initData: initData});

  return Course;
};
