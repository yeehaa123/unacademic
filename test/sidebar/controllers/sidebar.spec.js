import Sidebar from '../../../src/scripts/sidebar/controllers/sidebar.js';

describe("Sidebar", () => {
  let sidebar;
  let dispatcher;
  let navHelpers;

  beforeEach(function () {

    dispatcher = {};
    navHelpers = {};

    dispatcher.getState = sinon.stub().returns({mode: 'browsing'});
    dispatcher.setState = sinon.stub();
    dispatcher.registerObserverCallback = sinon.stub();
    navHelpers.goBack = sinon.spy();
    navHelpers.goForward = sinon.spy();

    sidebar = new Sidebar(dispatcher, navHelpers);
  });

  describe("initialize",() => {

    describe("app state", () => {
      it("gets the app state", () => {
        expect(dispatcher.getState).called;
      });

      it("sets the corresponding props", () => {
        expect(sidebar.user).to.be.undefined;
        expect(sidebar.mode).to.equal('browsing')
      });
    });

    describe("nav props", () => {
      it("sets the other vm props", () => {
        expect(sidebar.back).not.to.be.undefined;
        expect(sidebar.forward).not.to.be.undefined;
      });
    });

    describe("other props", () => {
      it("sets the other vm props", () => {
        expect(sidebar.modes).not.to.be.undefined;
        expect(sidebar.signIn).not.to.be.undefined;
        expect(sidebar.checkMode).not.to.be.undefined;
      });
    });

    it("sets the observer", () => {
      expect(dispatcher.registerObserverCallback).called;
    });
  });

  describe("navigation", () => {

    it("wires up navhelpers.back", () => {
      sidebar.back();
      expect(navHelpers.goBack).to.be.called;
    });

    it("wires up navhelpers.forward", () => {
      sidebar.forward();
      expect(navHelpers.goForward).to.be.called;
    });
  });

  describe("signing in", () => {

    it("sets the state", () => {
      sidebar.signIn();
      expect(dispatcher.setState).to.be.called;
    });

  });

  describe("check mode", () => {

    beforeEach(() => {
      sidebar.checkMode('learning');
    });

    it('keeps the old mode', () => {
      expect(sidebar.mode).to.equal('browsing');
    });

    it("sets the state", () => {
      expect(dispatcher.setState).to.be.called;
    });

  });

  describe("state switching", () => {

    describe("new mode, same user", () => {
      beforeEach(() => {
        dispatcher.registerObserverCallback.callArgWith(0, {mode: 'learning'});
      });

      it("sets the mode to learning", () => {
        expect(sidebar.mode).to.equal('learning');
      });

      it("keep the mode to learning", () => {
        expect(sidebar.user).to.undefined;
      });
    });

    describe("new mode, new user", () => {
      beforeEach(() => {
        dispatcher.registerObserverCallback.callArgWith(0, {mode: 'learning', user: 'yeehaa'});
      });

      it("sets the mode to learning", () => {
        expect(sidebar.mode).to.equal('learning');
      });

      it("keep the mode to learning", () => {
        expect(sidebar.user).to.equal('yeehaa');
      });
    });
  });
});
