import MainCtrl from '../../src/scripts/content/MainCtrl';
import ngMock from 'angular-mocks-node';

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
      info: {
        constructor: {
          name: 'cover'
        }
      },
      cards: '',
      schema: ''
    }

    let props = {
      learn: '123',
      curate: '123',
    }

    let init = {}
    init.cover = {};
    dispatcher = {}
    formHelpers = {}
    navHelpers = {}

    dispatcher.setState = sinon.spy();
    dispatcher.registerObserverCallback = sinon.spy();
    formHelpers.submit = sinon.spy();
    formHelpers.checkForm = sinon.spy();
    navHelpers.goTo = sinon.spy();
    init.cover.props = sinon.stub().returns(props);

    vm = new MainCtrl(init, $scope, dispatcher, data, navHelpers, formHelpers);
  });

  describe("general", () => {

    it("knows itself and its family", () => {
      expect(vm.viewName).to.equal('cover');
      expect(vm.childViewName).to.equal('course');
    });

    it("sets all the necessary props on the vm", () => {
      expect(vm.info).not.to.be.undefined;
      expect(vm.form).not.to.be.undefined;
      expect(vm.cards).not.to.be.undefined;
      expect(vm.schema).not.to.be.undefined;
      expect(vm.learn).not.to.be.undefined;
      expect(vm.curate).not.to.be.undefined;
    });

    it("binds goto correctly to the vm", () => {
      vm.goTo();
      expect(navHelpers.goTo).to.be.calledWith('course');
    });

    it("binds submit correctly to the vm", () => {
      vm.submit();
      expect(formHelpers.submit).to.be.calledWith({}, data.info);
    });

    it("registers the dispatcher observer callback", () => {
      expect(dispatcher.registerObserverCallback).to.have.been.calledOnce;
    });
  });

  describe("submiting the coverInfo data", () => {
    it("calls form helpers submit with the right arguments", () => {
      vm.form = '123';
      vm.info = '456';
      vm.submit()
      expect(formHelpers.submit).calledWith('123', '456');
    });
  });

  describe("watching the model for changes", () => {
    it("calls form helpers checkForm with the right arguments", () => {
      vm.form = '123';
      vm.info = {id: '456'};
      $scope.$digest();
      expect(formHelpers.checkForm).calledWith('123', '456');
    });
  });
});
