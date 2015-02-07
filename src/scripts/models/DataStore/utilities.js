export default utilities;

function utilities(baseUrl){
  return {
    generateUrl: generateUrl,
    generateResourceName: generateResourceName,
    generateUID: generateUID,
    createUrl: createUrl
  };

  function generateUrl(modelName, userId, id){
    let resourceName = generateResourceName(modelName);

    if(!userId){
      return `${baseUrl}/${resourceName}.json`;
    }
    if(id || id === 0){
      return `${baseUrl}/${resourceName}/${userId}/${id}.json`;
    }

    if(!id){
      return `${baseUrl}/${resourceName}/${userId}.json`;
    }

  }

  function createUrl({ resourceName, waypoint, id, curator} ){
    let url;
    if(waypoint){
      url = `${baseUrl}/waypoint/${curator}/${waypoint}/checkpoints/${id}`;
    } else {
      url = `${baseUrl}/${resourceName}/${curator}/${id}`;
    }
    return `${url}.json`
  }

  function generateUID(){
    let uid = Date.now();
    return uid;
  }

  function generateResourceName(modelName){
    return modelName.substr(0, 1).toLowerCase() + modelName.substr(1);
  }

  /* function generateId(){ */
  /*   function constructId(model){ */
  /*     if(model.curator && model.title){ */
  /*       var version = model.version.split(".").join("_"); */
  /*       return parameterize(model.curator) + "_" + parameterize(model.title); */
  /*     } */
  /*   } */

  /*   function parameterize(string){ */
  /*     return string.toLowerCase().split(' ').join("_"); */
  /*   } */

  /*   return constructId; */
  /* } */
};
