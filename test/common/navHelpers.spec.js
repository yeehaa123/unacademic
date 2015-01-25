import NavHelpers from '../../src/scripts/common/navHelpers.js';

describe("navHelpers", () => {
  let navHelpers;
  let dispatcher;
  let history;

  beforeEach(() => {
    dispatcher = {}
    dispatcher.queue = sinon.stub();
    dispatcher.getState = sinon.stub().returns({user: 'yeehaa'});
    dispatcher.setState = sinon.stub();

    history = {}
    history.previous = sinon.stub().returns('123');
    history.status = sinon.stub().returns('123');

    navHelpers = new NavHelpers(dispatcher, history);
  });

  describe("move to an existing resource", () => {

    beforeEach(() => {
      let name = 'courses.detail';
      let resource = {
        id: '123',
        curator: 'yeehaa'
      }
      navHelpers.goTo(name, resource);
    });

    it("does not calls dispatcher to get the current user", () => {
      expect(dispatcher.getState).not.called;
    });

    it("sets the app to the correct state", () => {
      expect(dispatcher.setState).calledWith({
        view: 'courses.detail',
        resource: {
          id: '123',
          curator: 'yeehaa'
        }
      });
    });
  });

  describe("add new course", () => {
    beforeEach(() => {
      let name = 'courses.detail';
      navHelpers.goTo(name);
    });

    it("calls dispatcher to get the current user", () => {
      expect(dispatcher.getState).calledOnce;
    });

    it("can create new courses", () => {
      expect(dispatcher.setState).calledWith({
        view: 'courses.detail',
        resource: {
          id: 'new',
          curator: 'yeehaa'
        }
      });
    });
  });

  describe("move back", () => {
    describe("on initial state", () => {
      beforeEach(() => {
        history.previous = sinon.stub();
        navHelpers.goBack();
      });

      it("calls history to get the previous state", () => {
        expect(history.previous).calledOnce;
      });

      it("calls dispatcher to set the previous state", () => {
        expect(dispatcher.setState).not.called;
      });
    });

    describe("on subsequent states", () => {

      beforeEach(() => {
        history.previous = sinon.stub().returns('123');
        navHelpers.goBack();
      });

      it("calls history to get the previous state", () => {
        expect(history.previous).calledOnce;
      });

      it("calls dispatcher to set the previous state", () => {
        expect(dispatcher.setState).calledWith('123');
      });
    });
  });

  describe("move forward", () => {
    describe("on initial state", () => {
      beforeEach(() => {
        history.next = sinon.stub();
        navHelpers.goForward();
      });

      it("calls history to get the next state", () => {
        expect(history.next).calledOnce;
      });

      it("calls dispatcher to set the next state", () => {
        expect(dispatcher.setState).not.called;
      });
    });

    describe("on subsequent states", () => {
      beforeEach(() => {
        history.next = sinon.stub().returns('123');
        navHelpers.goForward();
      });

      it("calls history to get the next state", () => {
        expect(history.next).calledOnce;
      });

      it("calls dispatcher to set the next state", () => {
        expect(dispatcher.setState).calledWith('123');
      });
    });
  });

  describe("can travel in time", () => {

    let canGoForward;
    let canGoBack;

    describe("end of history", () => {

      beforeEach(() => {
        history.status.returns({length: 10, index: 0});
        canGoForward = navHelpers.canGoForward();
        canGoBack = navHelpers.canGoBack();
      });

      it("calls history to get the next state", () => {
        expect(history.status).calledTwice;
      });

      it("calls dispatcher to set the next state", () => {
        expect(canGoForward).to.be.false;
        expect(canGoBack).to.be.true;
      });
    });

    describe("middle of history", () => {

      beforeEach(() => {
        history.status.returns({length: 10, index: 5});
        canGoForward = navHelpers.canGoForward();
        canGoBack = navHelpers.canGoBack();
      });

      it("calls history to get the next state", () => {
        expect(history.status).calledTwice;
      });

      it("calls dispatcher to set the next state", () => {
        expect(canGoForward).to.be.true;
        expect(canGoBack).to.be.true;
      });
    });

    describe("end of history", () => {

      beforeEach(() => {
        history.status.returns({length: 10, index: 10});
        canGoForward = navHelpers.canGoForward();
        canGoBack = navHelpers.canGoBack();
      });

      it("calls history to get the next state", () => {
        expect(history.status).calledTwice;
      });

      it("calls dispatcher to set the next state", () => {
        expect(canGoForward).to.be.true;
        expect(canGoBack).to.be.false;
      });
    });
  });
});
