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
});
