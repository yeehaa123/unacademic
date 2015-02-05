import Mode from '../../../src/scripts/appState/currentState/mode';

describe("mode", () => {
  let mode;

  beforeEach(() => {
    mode = new Mode();
  });

  it("can set a different mode", () => {
    mode.set('learning');
    expect(mode.get()).to.equal('learning');
  });
});
