import MainCtrl from '../../src/scripts/content/MainCtrl';

describe("MainCtrl", () => {
  let vm;
  let dispatcher;
  let resolver;

  beforeEach(function () {
    dispatcher = {};
    resolver = sinon.stub();

    dispatcher.registerObserverCallback = sinon.stub();

    vm = new MainCtrl(dispatcher, resolver);
  });

  describe("general", () => {
    it("registers the dispatcher observer callback", () => {
      expect(dispatcher.registerObserverCallback).to.have.been.called;
    });
  });

  describe("callback triggers", () => {
    let viewName;
    let response;
    let promise;

    beforeEach(() => {
      let params = {};
      params.mode = 'browsing', 
      params.view = { name: 'cover' };
      params.user = 'yeehaa';

      viewName = params.view.name;
      promise = Promise.resolve({model: '1', collection: '2'});
      resolver.returns(promise);

      dispatcher.registerObserverCallback.callArgWith(0, params);
    });

    it("retrieves the cover info", (done) => {
      promise.then(() => {
        expect(resolver).called;
        done();
      });
    });

    it("sets the model", (done) => {
      promise.then(() => {
        expect(vm.model).not.to.be.undefined;
        done();
      });
    });

    it("sets the collection", (done) => {
      promise.then(() => {
        expect(vm.collection).not.to.be.undefined;
        done();
      });
    });

    it("sets the mode", (done) => {
      promise.then(() => {
        expect(vm.mode).to.equal('browsing');
        done();
      });
    });
  });
});
