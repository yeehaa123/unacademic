export default CoverInit;

function CoverInit($q, BaseClass, Constellation, coverSchema, coverInitData){

  class Cover extends BaseClass {

    static get(userId, id){
      return $q((resolve, reject) => {
        let coverPromise = super.get(userId, id);
        let constellationPromise;
        let promises;

        if(!userId || userId === 'general'){
          constellationPromise = Constellation.getAll();
        } else {
          constellationPromise = Constellation.getAll(userId);
        }

        promises = [coverPromise, constellationPromise];

        $q.all(promises).then(function(data){
          let cover     = data[0];
          let constellations   = data[1];
          return resolve({cover, constellations});
        });
      });
    }
  }

  Cover.initialize({schema: coverSchema, initData: coverInitData});

  return Cover;
};
