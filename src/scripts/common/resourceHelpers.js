export default resourceHelpers;
import _ from 'lodash';

function resourceHelpers(){
  let lineage = ['cover', 'course', 'waypoint', 'checkpoint'];

  return {
    createViewState: createViewState,
    // add tests
    getChildName: getChildName
  };

  function getChildName(name){
    let index = _.indexOf(lineage, name);
    return lineage[index + 1];
  }

  function createViewState(newState, oldState, user){

    if(_.isEmpty(newState)){
      return oldState;
    }

    if(!oldState.curator && !newState.curator){
      newState.curator = user;
    }

    let newStateIndex = _.indexOf(lineage, newState.name);
    let oldStateIndex = _.indexOf(lineage, oldState.name);

    if(!oldState || newStateIndex <= oldStateIndex){
      return newState;
    }

    return _.extend(oldState, newState);
  }
}
