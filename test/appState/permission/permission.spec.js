import Permission from '../../../src/scripts/appState/permission/index';
import ngMock from 'angular-mocks-node';

describe("permission", () => {
  let permission;
  let $log;
  let currentState;
  let resourceHelpers;
  let proposal;
  let isAllowed;

  beforeEach(() => {

    ngMock.inject(function( _$log_){
      $log = _$log_;
    });

    resourceHelpers = {};

    resourceHelpers.createViewState = sinon.stub();

    permission = new Permission($log, resourceHelpers);
  });

  describe("general", () => {

    describe("invalid app mode", () => {
      beforeEach(() => {

        currentState = {
          user: 'yeehaa',
          mode: 'learning',
        };

        proposal = {
          user: 'yeehaa',
          mode: 'bla',
          queue: new Set()
        };

        isAllowed = permission.get(currentState, proposal);
      });

      it("returns an empty object", () => {
        expect(isAllowed).to.deep.equal({});
      });

      it("logs the proper warning", () => {
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('appmode');
      });
    });

    describe("no changes", () => {
      beforeEach(() => {

        currentState = {
          user: 'yeehaa',
          mode: 'learning',
          name: '123'
        }

        proposal = {
          user: 'yeehaa',
          mode: 'learning',
          queue: new Set()
        }

        isAllowed = permission.get(currentState, proposal);
      });

      it("returns an empty object", () => {
        expect(isAllowed).to.deep.equal({});
      });
    });
  });

  describe("resource changes", () => {

    describe("no changes", () => {
      beforeEach(() => {

        currentState = {
          mode: 'browsing',
          view: {
            course: '123',
            curator: 'yeehaa'
          }
        }

        proposal = {
          mode: 'browsing',
          resource: {
            course: '123',
            curator: 'yeehaa',
          },
          queue: new Set()
        }

        isAllowed = permission.get(currentState, proposal);
      });

      it("returns an empty object", () => {
        expect(isAllowed).to.deep.equal({});
      });
    })

    describe("changes", () => {
      beforeEach(() => {

        currentState = {
          mode: 'browsing',
          view: {
            name: 'course',
            course: '123',
            curator: 'yeehaa'
          }
        }

        proposal = {
          mode: 'browsing',
          view: {
            course: '456',
            curator: 'yeehaa',
          },
          queue: new Set()
        }

        resourceHelpers.createViewState.returns({course: '456'});
        isAllowed = permission.get(currentState, proposal);
      });

      it("creates a view state", () => {
        expect(resourceHelpers.createViewState)
          .calledWith(proposal.view, currentState.view, undefined);
      });


      it("returns the resource id", () => {
        expect(isAllowed.view.course).to.equal('456');
      });

      it("includes the view name", () => {
        expect(isAllowed.view).not.to.be.undefined;
      });

    })
  });

  describe("queue", () => {
    describe("is full", () => {
      beforeEach(() => {

        currentState = {
          mode: 'learning',
          user: 'yeehaa'
        }

        let nextState = {
          mode: 'curation',
          user: 'yeehaa',
          queue: new Set([1,2,3])
        }

        isAllowed = permission.get(nextState, currentState);
      });

      it("is not allowed to switch", () => {
        expect(isAllowed).to.deep.equal({});
        expect($log.warn.logs.length).to.equal(1);
        expect($log.warn.logs[0][0]).to.contain('locked');
      });
    });
  });

  describe("browsing mode", () => {

    beforeEach(() => {

      currentState = {
        user: '',
        mode: 'browsing',
      }

    });

    it("is not allowed to switch to learning", () => {

      proposal = {
        mode: 'learning',
        queue: new Set()
      }

      isAllowed = permission.get(currentState, proposal);
      expect(isAllowed).to.deep.equal({});
      expect($log.warn.logs.length).to.equal(1);
      expect($log.warn.logs[0][0]).to.contain('signing in');
    });

    it("is not allowed to switch to curation", () => {

      proposal = {
        user: '',
        mode: 'curation',
        name: '123',
        queue: new Set()
      }

      isAllowed = permission.get(currentState, proposal);
      expect(isAllowed).to.deep.equal({});
      expect($log.warn.logs.length).to.equal(1);
      expect($log.warn.logs[0][0]).to.contain('signing in');
    });

    it("is allowed to switch routes", () => {

      proposal = {
        user: '',
        mode: 'browsing',
        view: '345',
        queue: new Set()
      }

      resourceHelpers.createViewState.returns({course: '456'});
      isAllowed = permission.get(currentState, proposal);
      expect(isAllowed.view).to.deep.equal({course: '456'});
    });
  });

  describe("learning mode", () => {

    beforeEach(() => {

      currentState = {
        user: 'yeehaa',
        mode: 'learning',
        view: '123'
      }

    });

    it("is allowed to switch to curation", () => {

      proposal = {
        user: 'yeehaa',
        mode: 'curation',
        view: '123',
        queue: new Set()
      }

      isAllowed = permission.get(currentState, proposal);
      expect(isAllowed.mode).to.equal('curation');
    });
  });

  describe("curation mode", () => {

    beforeEach(() => {

      currentState = {
        user: 'yeehaa',
        mode: 'curation',
        name: '123'
      }
    });

    it("is allowed to switch to learning", () => {

      proposal = {
        user: 'yeehaa',
        mode: 'learning',
        name: '123',
        queue: new Set()
      }

      isAllowed = permission.get(currentState, proposal);
      expect(isAllowed.mode).to.equal('learning');
    });
  });
})
