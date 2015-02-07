export default DataStore;
import _ from 'lodash';

function DataStore(baseUrl, $http, $q, utilities){
  return {
    get: get,
    fetch: fetch,
    save: save
  };

  function fetch(url){
    console.log(url);
    return $http.get(url).then(extractData);
  }

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

  function save(url, instance){
    return $http.put(url, instance);
  }

  function extractData({data}){
    if(data && data.id){
      data.id = `${data.id}`;
    }
    return data;
  }

  function extractCollection(response){
    let data = response.map((item) => { 
      item.data.id = `${ item.data.id }`;
      return item.data; 
    });
    return data;
  }
}
