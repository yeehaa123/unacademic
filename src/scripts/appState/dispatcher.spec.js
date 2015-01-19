import Dispatcher from './dispatcher';

describe("dispatcher", () => {
  let dispatcher;

  let currentState;
  let queue;
  let mutator;
  let permission;

  beforeEach(() => {

    currentState = {};
    queue = {};
    permission = {};
    mutator = {}

    currentState.get = sinon.stub().returns({mode: 'learning'});
    queue.get = sinon.stub().returns(['123']);
    queue.set = sinon.spy();
    permission.get = sinon.stub();
    mutator.set = sinon.stub().returns(Promise.resolve());

    dispatcher = new Dispatcher(currentState, queue, permission, mutator);
  });


  describe("get", () => {
    let state;

    beforeEach(() => {
      state = dispatcher.getState();
    })

    it("gets the currentState", () => {
      expect(currentState.get).calledOnce;
    });
  });

  describe("set", () => {
    let notificationSpy;

    beforeEach(() => {
      notificationSpy = sinon.spy();
      dispatcher.registerObserverCallback(notificationSpy);
    });


    describe("with no changes", () => {

      beforeEach(() => {
        permission.get.returns({});
        dispatcher.setState({user: 'yeehaa'});
      });

      it("does not call the mutator", () => {
        expect(mutator.set).not.called;
      });

      it("does not notify observers", () => {
        expect(notificationSpy).not.called;
      });
    });

    describe("with changes", () => {
      let changes;
      let state;

      beforeEach(() => {

        state = {
          mode: 'learning',
          queue: ['123']
        }

        changes = {
          mode: 'learning',
        }

        permission.get.withArgs(state, changes).returns(changes);
        dispatcher.setState(changes);
      });

      it("calls the mutator with changes", () => {
        expect(mutator.set).calledWith(changes);
      });

      xit("notifies observers", () => {
        expect(notificationSpy).calledOnce;
      });

    });
  });

  describe("queue", () => {

    it("delegates to the queue service", () => {
      let returnValue = dispatcher.queue();
      expect(queue.set).calledOnce;
    });

  });
});
