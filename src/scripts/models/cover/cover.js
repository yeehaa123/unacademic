export default CoverInit;

function CoverInit($q, BaseClass, Course, coverSchema, coverInitData){

  class Cover extends BaseClass {
    static get(userId){
      return $q((resolve, reject) => {
        let promises = [
          super.get(userId),
          Course.getAll(userId)
        ];

        $q.all(promises).then(function(data){
          let cover = data[0];
          cover.courses = data[1];
          return resolve(cover);
        });
      });
    }
  }

  Cover.initialize({schema: coverSchema, initData: coverInitData});

  return Cover;
};
