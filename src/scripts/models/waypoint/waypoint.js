export default WaypointInit;

function WaypointInit(BaseClass, coverSchema, coverInitData){

  class Waypoint extends BaseClass {}

  Waypoint.initialize({schema: coverSchema, initData: coverInitData});

  return Waypoint;
};
