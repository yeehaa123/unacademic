export default CourseInit;

function CourseInit(BaseClass, schema, initData){

  class Course extends BaseClass {}

  Course.initialize({schema: schema, initData: initData});

  return Course;
};
