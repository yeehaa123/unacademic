import View from '../../../src/scripts/appState/currentState/view';

describe("view", () => {
  let view;
  let $log;

  beforeEach(() => {
    view = new View();
  });

  describe("view name", () => {

    it("calls $state to get its initial state name", () => {
      expect(view.get()).to.equal('');
    });

    describe("set", () => {
      let name;
      let setName;

      beforeEach(() => {
        name = '123';
        setName = view.set(name);
      });


      it("returns true", () => {
        expect(setName).to.be.true;
      });

      it("can be set", () => {
        expect(view.get()).to.equal(name);
      });
    })
  })
});
