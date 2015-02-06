import _ from 'lodash';

export default newState;

function newState() {
  return {
    create: create
  }

  function create(proposal, state){
    delete proposal.queue;
    let newState = _.extend(state, proposal);
    return newState;
  }
}
