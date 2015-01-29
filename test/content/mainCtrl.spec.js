import MainCtrl from '../../src/scripts/content/MainCtrl';
import ngMock from 'angular-mocks-node';

describe("MainCtrl", () => {
  let vm;
  let dispatcher;
  let init;

  beforeEach(function () {
    init = {}
    dispatcher = {}

    dispatcher.registerObserverCallback = sinon.stub();

    vm = new MainCtrl(init, dispatcher);
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
      init[viewName] = {};
      promise = Promise.resolve({model: '1', collection: '2'});
      init[viewName].resolver = sinon.stub().returns(promise);

      dispatcher.registerObserverCallback.callArgWith(0, params);
    });

    it("retrieves the cover info", (done) => {
      promise.then(() => {
        expect(init[viewName].resolver).called;
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
