export default courseResolver;

function courseResolver($q, Course){

  return data;

  function data({view: {curator, course}}){

    return $q((resolve, reject) => {

      if(!curator){ 
        return reject(); 
      }

      if(curator && course === 'new'){
        return resolve(new Course());
      }

      Course.get(curator, course).then((data) => {
        let model = data;
        let collection = data.waypoints;
        console.log(model, collection);
        resolve({model, collection});
      });
    });
  }
}
