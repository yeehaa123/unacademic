import Mode from './mode';

describe("mode", () => {
  let mode;

  beforeEach(() => {
    mode = new Mode();
  });

  it("defaults to browsing", () => {
    expect(mode.get()).to.equal('browsing');
  });

  it("can set a different mode", () => {
    mode.set('learning');
    expect(mode.get()).to.equal('learning');
  });
});
