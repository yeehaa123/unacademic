export default init;

function init(coverResolver, 
              constellationResolver, 
              waypointsResolver,
              waypointResolver){

  return {
    cover: {
      resolver: coverResolver
    },
    constellation: {
      resolver: constellationResolver
    },
    waypoints: {
      resolver: waypointsResolver
    },
    waypoint: {
      resolver: waypointResolver
    }
  };
}
