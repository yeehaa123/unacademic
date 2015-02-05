import _ from 'lodash';

export default newState;

function newState(resourceHelpers) {
  var modes = ['browsing', 'learning', 'curation'];

  return {
    create: create
  }

  function create(proposal, state){
    delete proposal.queue;
    return _.extend(state, proposal);
  }
}
