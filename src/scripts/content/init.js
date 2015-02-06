export default init;

function init(coverResolver, 
              coverProps, 
              constellationResolver, 
              constellationProps,
              waypointsResolver,
              waypointsProps,
              waypointResolver,
              waypointProps){

  return {
    cover: {
      resolver: coverResolver,
      props: coverProps
    },
    constellation: {
      resolver: constellationResolver,
      props: constellationProps
    },
    waypoints: {
      resolver: waypointsResolver,
      props: waypointsProps
    },
    waypoint: {
      resolver: waypointResolver,
      props: waypointProps
    }
  };
}
