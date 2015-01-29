export default CoverInit;

function CoverInit($q, BaseClass, Course, coverSchema, coverInitData){

  class Cover extends BaseClass {

    static get(userId, id){
      return $q((resolve, reject) => {
        let coverPromise = super.get(userId, id);
        let coursePromise;
        let promises;

        if(!userId || userId === 'general'){
          coursePromise = Course.getAll();
        } else {
          coursePromise = Course.getAll(userId);
        }

        promises = [coverPromise, coursePromise];

        $q.all(promises).then(function(data){
          let cover     = data[0];
          let courses   = data[1] || [];
          return resolve({cover, courses});
        });
      });
    }
  }

  Cover.initialize({schema: coverSchema, initData: coverInitData});

  return Cover;
};
