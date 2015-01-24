import Mutator from '../../src/scripts/appState/mutator';
import ngMock from 'angular-mocks-node';

describe("mutator", () => {
  let mutator;
  let currentState;
  let history;
  let switcher;
  let $rootScope;
  let $q;

  beforeEach(() => {

    ngMock.inject((_$q_, _$rootScope_) => {
      $q = _$q_;
      $rootScope = _$rootScope_;
    });

    currentState = {};
    switcher = {};
    history = {};

    currentState.get = sinon.stub().returns({mode: 'learning'});
    currentState.set = sinon.spy();
    history.add = sinon.spy();

    mutator = new Mutator($q, currentState, switcher, history)
  });

  describe("set", () => {
    let changes;
    let msg;

    describe("successful mutations", () => {

      beforeEach(() => {

        switcher.set = sinon.stub().returns($q.when());
        changes = {
          mode: 'learning',
        }

        mutator.set(changes)
          .then((res) => { msg = res })
          .catch((err) => {msg = err })

        $rootScope.$digest();
      });

      it("sets the values", () => {
        expect(currentState.set).calledWith(changes)
      });

      it("gets the currentState", () => {
        expect(currentState.get).calledOnce;
      });

      it("adds to the history", () => {
        expect(history.add).calledOnce;
      });

      it("returns the new state", () => {
        expect(msg).to.deep.equal({mode: 'learning'});
      });
    });

    describe("failed mutations", () => {

      beforeEach(() => {

        switcher.set = sinon.stub().returns($q.reject());

        mutator.set(changes)
          .then((res) => { msg = res })
          .catch((err) => {msg = err })

        $rootScope.$digest();
      });

      it("does not set the values", () => {
        expect(currentState.set).not.called;
      });

      it("does not get the currentState", () => {
        expect(currentState.get).not.called;
      });

      it("does not add to the history", () => {
        expect(history.add).not.called;
      });

      it("returns an error message", () => {
        expect(msg).to.contain("groundcontrol");
      });
    });
  });
});
