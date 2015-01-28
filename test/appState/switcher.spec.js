import Switcher from '../../src/scripts/appState/switcher';

xdescribe("switcher", () => {
  let switcher;
  let $state;
  let $q;

  beforeEach(() => {
    $state = {};
    $q = {}
    $q.when = sinon.stub()
    $state.go = sinon.stub();
    switcher = new Switcher($state, $q);
  });

  describe("state switching", () => {
    let state;
    let response;
    let promise;

    describe("it has no name", () => {
      beforeEach(() => {
        state = {};
        promise = Promise.resolve('foo');
        $q.when.withArgs('no route change').returns(promise);
        response = switcher.set(state);
      });

      it("does not call $state", () => {
        expect($state.go).not.called;
      });

      it("returns the success message", () => {
        return expect(response).to.eventually.equal("foo");
      });
    });

    describe("it has a name", () => {
      beforeEach(() => {
        state = { view: 'waypoints.detail' };
        promise = Promise.resolve('foo');
        $state.go.withArgs(state.view, undefined).returns(promise);
        response = switcher.set(state);
      });

      it("does not call $q", () => {
        expect($q.when).not.called;
      });

      it("returns the success message", () => {
        return expect(response).to.eventually.equal("foo");
      });
    });
  })
});
