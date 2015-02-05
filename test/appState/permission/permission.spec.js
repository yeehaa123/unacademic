import Permission from '../../../src/scripts/appState/permission/permission';

describe("permission", () => {
  let permission;
  let rules;
  let currentState;
  let proposal;
  let newState;
  let judgement;
  let state;

  beforeEach(() => {
    state = { mode: 'learning' };

    rules = {};
    proposal = {};
    newState = {};

    rules.check = sinon.stub();
    proposal.create = sinon.stub().returns(state);
    newState.create = sinon.stub().returns(state);

    permission = new Permission(rules, proposal, newState);
  });

  describe("if new state is invalid", () => {

    beforeEach(() => {
      rules.check.returns(false);
      judgement = permission.get(state, state);
    });

    it("checks if the rules are valid", () => {
      expect(proposal.create).to.be.calledWith(state, state);
    });

    it("checks if the rules are valid", () => {
      expect(rules.check).to.be.calledWith(state);
    });

    it("checks if the rules are valid", () => {
      expect(newState.create).not.to.be.called;
    });

    it("returns false", () => {
      expect(judgement).to.equal(false);
    });
  });

  describe("if new state is valid", () => {

    beforeEach(() => {
      rules.check.returns(true);
      judgement = permission.get(state, state);
    });

    it("checks if the rules are valid", () => {
      expect(proposal.create).to.be.calledWith(state, state);
    });

    it("checks if the rules are valid", () => {
      expect(rules.check).to.be.calledWith(state);
    });

    it("checks if the rules are valid", () => {
      expect(newState.create).to.be.calledWith(state, state);
    });

    it("returns true", () => {
      expect(judgement).to.equal(state);
    });
  });
});


