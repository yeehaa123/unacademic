export default courseResolver;
import _ from 'lodash';

function courseResolver($q, Course, $http){

  return data;

  function data({curator, course}){
    let schema = Course.schema;
    let curatorId;
    let courseId;

    if(curator){
      curatorId = curator;
    }

    if(course){
      courseId = course;
    }

    return $q((resolve, reject) => {

      if(!curatorId){
        return reject();
      }

      if(curatorId && courseId === 'new'){
        let course = new Course();
        return resolve(course);
      }

      Course.get(curatorId, courseId)
        .then((data) => {
          return resolve(data);
        });
    });
  }
}
