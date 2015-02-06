import NewState from '../../../src/scripts/appState/permission/newState';

describe("NewState", () => {
  let newState;

  beforeEach(() => {
    newState = new NewState();
  });

  it("includes props that are not in the proposal", () => {
    let proposal = { id: '123' };
    let state = { user: 'yeehaa' };
    let result = newState.create(proposal, state);
    expect(result.user).to.equal('yeehaa');
    expect(result.id).to.equal('123');
  });

  it("overrides props that are in the state", () => {
    let state = { id: '456' };
    let proposal = { id: '123' };
    let result = newState.create(proposal, state);
    expect(result.id).to.equal('123');
  });
});

