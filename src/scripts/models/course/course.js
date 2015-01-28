export default CourseInit;

function CourseInit($q, BaseClass, Waypoint, schema, initData){

  class Course extends BaseClass {
    static get(userId, id){
      return super.get(userId, id).then(getWaypoints);
    }
  }

  function getWaypoints(course){
    return $q((resolve, reject) => {
      if(course.waypoints){
        Waypoint.get(course.curator, course.waypoints)
          .then((waypoints) => {
            course.waypoints = waypoints;
            resolve(course);
          });
      } else {
        course.waypoints = [];
        resolve(course);
      }
    });
  };

  Course.initialize({schema: schema, initData: initData});

  return Course;
};
