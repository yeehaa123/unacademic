import ToolboxCtrl from '../../../src/scripts/sidebar/controllers/toolbox.js';

describe("Toolbox", () => {
  let toolbox;
  let dispatcher;
  let navHelpers;

  beforeEach(function () {

    dispatcher = {};
    navHelpers = {};

    dispatcher.getState = sinon.stub().returns({mode: 'browsing'});
    dispatcher.getModes = sinon.stub().returns(['browsing', 'learning', 'curation']);
    dispatcher.setState = sinon.stub();
    dispatcher.registerObserverCallback = sinon.stub();
    navHelpers.goBack = sinon.spy();
    navHelpers.goForward = sinon.spy();

    toolbox = new ToolboxCtrl(dispatcher, navHelpers);
  });

  describe("initialize",() => {

    describe("app state", () => {
      it("gets the app state", () => {
        expect(dispatcher.getState).called;
      });


      it("sets the corresponding props", () => {
        expect(toolbox.user).to.be.undefined;
        expect(toolbox.mode).to.equal('browsing')
      });
    });

    describe("app modes", () => {
      it("gets the app modes", () => {
        expect(dispatcher.getModes).called;
      });
    });

    describe("nav props", () => {
      it("sets the other vm props", () => {
        expect(toolbox.back).not.to.be.undefined;
        expect(toolbox.forward).not.to.be.undefined;
      });
    });

    describe("other props", () => {
      it("sets the other vm props", () => {
        expect(toolbox.modes).not.to.be.undefined;
        expect(toolbox.signIn).not.to.be.undefined;
        expect(toolbox.checkMode).not.to.be.undefined;
      });
    });

    it("sets the observer", () => {
      expect(dispatcher.registerObserverCallback).called;
    });
  });

  describe("navigation", () => {

    it("wires up navhelpers.back", () => {
      toolbox.back();
      expect(navHelpers.goBack).to.be.called;
    });

    it("wires up navhelpers.forward", () => {
      toolbox.forward();
      expect(navHelpers.goForward).to.be.called;
    });
  });

  describe("signing in", () => {

    it("sets the state", () => {
      toolbox.signIn();
      expect(dispatcher.setState).to.be.called;
    });

  });

  describe("check mode", () => {

    beforeEach(() => {
      toolbox.checkMode('learning');
    });

    it('keeps the old mode', () => {
      expect(toolbox.mode).to.equal('browsing');
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
        expect(toolbox.mode).to.equal('learning');
      });

      it("keep the mode to learning", () => {
        expect(toolbox.user).to.undefined;
      });
    });

    describe("new mode, new user", () => {
      beforeEach(() => {
        dispatcher.registerObserverCallback.callArgWith(0, {mode: 'learning', user: 'yeehaa'});
      });

      it("sets the mode to learning", () => {
        expect(toolbox.mode).to.equal('learning');
      });

      it("keep the mode to learning", () => {
        expect(toolbox.user).to.equal('yeehaa');
      });
    });
  });
});
