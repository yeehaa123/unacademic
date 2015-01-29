export default CoverInit;

function CoverInit($q, BaseClass, Course, coverSchema, coverInitData){

  class Cover extends BaseClass {

    static get(userId, id){
      return $q((resolve, reject) => {
        let promises = [
        super.get(userId, id),
          Course.getAll(),
          Course.getAll(userId)
        ];

        $q.all(promises).then(function(data){
          let cover = data[0];
          cover.courses = data[1];
          cover.userCourses = data[2] || [];
          return resolve(cover);
        });
      });
    }
  }

  Cover.initialize({schema: coverSchema, initData: coverInitData});

  return Cover;
};

