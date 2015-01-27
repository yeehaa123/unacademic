export default DataStore;
import _ from 'lodash';

function DataStore(baseUrl, $http, $q, utilities){
  return {
    get: get,
    save: save
  };

  function get(modelName, userId, id){
    if(_.isArray(id)){
      let promises = id.map((id) => {
        let url = utilities.generateUrl(modelName, userId, id);
        return $http.get(url);
      });
      return $q.all(promises).then(extractCollection);
    } else {
      let url = utilities.generateUrl(modelName, userId, id);
      return $http.get(url).then(extractData);
    }
  }

  function save(instance){
    let url = utilities.generateUrl(instance.constructor.name, instance.curator, instance.id);
    return $http.put(url, instance);
  }

  function extractData(response){
    let data = response.data;
    return data;
  }

  function extractCollection(response){
    let data = response.map((item) => { return item.data });
    return data;
  }
}
