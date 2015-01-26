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
