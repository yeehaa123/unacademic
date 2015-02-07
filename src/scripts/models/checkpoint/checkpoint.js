export default CheckpointInit;

function CheckpointInit(BaseClass, schema, initData){

  class Checkpoint extends BaseClass {

    constructor(waypoint){
      this.waypoint = waypoint;
      super();
    }
  }

  Checkpoint.initialize({schema: schema, initData: initData});

  return Checkpoint;
};
