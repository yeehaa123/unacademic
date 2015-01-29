export default courseResolver;

function courseResolver($q, Course){

  return data;

  function data({view: {curator, course}}){

    return $q((resolve, reject) => {

      if(!curator){ 
        return reject(); 
      }

      if(curator && course === 'new'){
        return resolve(course);
      }

      Course.get(curator, course).then((data) => resolve(data));
    });
  }
}
