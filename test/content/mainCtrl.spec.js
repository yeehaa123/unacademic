import MainCtrl from '../../src/scripts/content/MainCtrl';
import ngMock from 'angular-mocks-node';

describe("MainCtrl", () => {
  let vm;
  let $scope;
  let $q;
  let dispatcher;
  let data;
  let init;

  beforeEach(function () {

    ngMock.inject(function ($rootScope, _$q_) {
      $scope = $rootScope.$new();
      $q = _$q_;
    });

    data = {
      constructor: {
        name: 'cover'
      },
      courses: 'haskjlf',
      schema: ''
    }


    init = {}
    dispatcher = {}

    dispatcher.registerObserverCallback = sinon.stub();

    vm = new MainCtrl(init, dispatcher, data);
  });

  describe("general", () => {
    it("registers the dispatcher observer callback", () => {
      expect(dispatcher.registerObserverCallback).to.have.been.called;
    });
  });

  describe("callback triggers", () => {
    let viewName;
    let response;


    beforeEach(() => {

      let params = { 
        mode: 'browsing',
        view: { 
          name: 'cover' 
        } 
      };

      viewName = params.view.name;
      init[viewName] = {};

      let promise = $q.when('hurray!');
      init[viewName].resolver = sinon.stub().returns(promise);

      dispatcher.registerObserverCallback.callArgWith(0, params);

      promise.then((data) => {});

      $scope.$digest();
    });

    it("retrieves the cover info", () => {
      expect(init[viewName].resolver).called;
    });

    it("sets the model", () => {
      expect(vm.model).not.to.be.undefined;
    });

    it("sets the mode", () => {
      expect(vm.mode).not.to.be.undefined;
    });
  });
});
