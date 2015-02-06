export default ConstellationInit;
import _ from 'lodash';

function ConstellationInit($q, BaseClass, Waypoint, schema, initData){

  class Constellation extends BaseClass {

    static clone(userId, instance){
      let promises = [
        this.getWaypoints(instance),
        super.clone(userId, instance)
      ];

      return $q.all(promises).then(cloneWaypoints);
    }

    static getWaypoints(constellation){
      return $q((resolve, reject) => {
        let user;
        if(constellation.waypoints){
          Waypoint.get(constellation.curator, constellation.waypoints)
            .then((waypoints) => {
              resolve({waypoints, constellation});
            });
        } else {
          let waypoints = [];
          resolve({waypoints, constellation});
        }
      });
    }
  }

  function cloneWaypoints([{waypoints}, constellation]){
    return $q((resolve, reject) => {
      _.each(waypoints, (waypoint) => {
        Waypoint.clone(constellation.curator, waypoint);
      });
      resolve(constellation);
    });
  }

  Constellation.initialize({schema: schema, initData: initData});

  return Constellation;
};
