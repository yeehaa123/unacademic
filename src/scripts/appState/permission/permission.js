import _ from 'lodash';

export default permission;

function permission(rules, proposal, newState) {
  var modes = ['browsing', 'learning', 'curation'];

  return {
    get: get
  }

  function get(currentState, changes) {
    let prop = proposal.create(currentState, changes)
    let valid = rules.check(prop);

    return valid ? newState.create(prop, currentState) : false;
  }
}
