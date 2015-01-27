import MainCtrl from '../../src/scripts/content/MainCtrl';
import ngMock from 'angular-mocks-node';

// needs refactoring
describe("MainCtrl", () => {
  let vm;
  let $scope;
  let dispatcher;
  let formHelpers;
  let navHelpers;
  let data;

  beforeEach(function () {

    ngMock.inject(function ($rootScope, $controller) {
      $scope = $rootScope.$new();
    });

    data = {
      constructor: {
        name: 'cover'
      },
      courses: 'haskjlf',
      schema: ''
    }


    let init = {}
    dispatcher = {}

    dispatcher.registerObserverCallback = sinon.spy();

    vm = new MainCtrl(init, dispatcher, data);
  });

  describe("general", () => {

    it("knows itself", () => {
      expect(vm.viewName).to.equal('cover');
    });

    it("sets all the necessary props on the vm", () => {
      expect(vm.info).not.to.be.undefined;
      expect(vm.cards).not.to.be.undefined;
    });

    it("registers the dispatcher observer callback", () => {
      expect(dispatcher.registerObserverCallback).to.have.been.calledOnce;
    });
  });
});
