export default CoverInit;

function CoverInit($q, BaseClass, Course, coverSchema, coverInitData){

  class Cover extends BaseClass {
    static get(userId, id){
      return $q((resolve, reject) => {
        let promises = [
          super.get(userId, id),
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

// function coverResolver($q, Cover, Course, dispatcher){
// 
//   return data;
// 
//   function data(){
//     let userId = dispatcher.getState().user;
// 
//     let coverUser = userId || 'general';
// 
//     return $q(function(resolve, reject){
//       let promises = [
//         Cover.get(coverUser, 'info'),
//         Course.getAll(userId)
//       ];
// 
//       $q.all(promises).then(function(data){
//         let name = 'cover';
//         let info = data[0];
//         let cards = data[1];
//         let schema = Cover.schema;
//         return resolve({name, info, schema, cards});
//       });
//     });
//   }
// }
