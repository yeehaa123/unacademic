import Sidebar from '../../../src/scripts/sidebar/controllers/sidebar.js';

describe("Sidebar", () => {
  let sidebar;
  let dispatcher;

  beforeEach(function () {

    dispatcher = {};
    dispatcher.getState = sinon.stub().returns({mode: 'browsing'});
    dispatcher.registerObserverCallback = sinon.stub();

    sidebar = new Sidebar(dispatcher);
  });

  describe("initialize",() => {

    describe("app state", () => {
      it("gets the app state", () => {
        expect(dispatcher.getState).called;
      });


      it("sets the corresponding props", () => {
        expect(sidebar.mode).to.equal('browsing')
      });
    });

    it("sets the observer", () => {
      expect(dispatcher.registerObserverCallback).called;
    });
  });

  xdescribe("watching the model for changes", () => {
    it("calls form helpers checkForm with the right arguments", () => {
      vm.form = '123';
      vm.info = {id: '456'};
      $scope.$digest();
      expect(formHelpers.checkForm).calledWith('123', '456');
    });
  });
});
