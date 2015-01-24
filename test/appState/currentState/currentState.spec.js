import CurrentState from '../../../src/scripts/appState/currentState/currentState'
import _ from 'lodash';

describe("currentState", () => {
  let currentState;
  let mode;
  let user;
  let view;
  let resource;
  let timestamp;
  let modules;

  beforeEach(() => {

    mode      = { name: 'mode' };
    user      = { name: 'user' };
    view      = { name: 'name' };
    resource  = { name: 'resource' };
    timestamp = { name: 'timestamp' };

    modules = [mode, user, view, resource, timestamp];

    _.each(modules, (module) => {
      module['get'] = sinon.spy();
      module['set'] = sinon.spy();
    });

    currentState = new CurrentState(...modules);
  });

  describe("get", () => {
    let state;

    beforeEach(() => {
      currentState.get();
    })

    it("gets the correct data", () => {
      _.each(modules, (module) => { expect(module.get).calledOnce });
    });
  });

  describe("set", () => {
    describe("with no changes", () => {

      beforeEach(() => {
        currentState.set({});
      });


      it("does not set any value", () => {
        _.each(modules, (module) => { expect(module.set).not.called });
      });
    });

    describe("with one change", () => {

      beforeEach(() => {

        let newState = {
          mode: 'learning',
        }

        currentState.set(newState);
      });

      it("sets the values", () => {
        expect(user.set).not.called;
        expect(mode.set).calledWith('learning');
        expect(view.set).not.called;
        expect(resource.set).not.called;
      });
    });

    describe("with multiple changes", () => {
      beforeEach(() => {

        let newState = {
          mode: 'learning',
          resource: '123',
          name: 'courses.detail',
          user: 'yeehaa',
          timestamp: '123'
        }

        currentState.set(newState);
      });

      it("sets the values", () => {
        expect(user.set).calledWith('yeehaa');
        expect(mode.set).calledWith('learning');
        expect(view.set).calledWith('courses.detail');
        expect(resource.set).calledWith('123');
        expect(timestamp.set).calledWith('123');
      });

    });
  });
});
