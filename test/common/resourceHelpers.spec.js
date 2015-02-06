import ResourceHelpers from '../../src/scripts/common/resourceHelpers.js';

describe("resourceHelpers", () => {
  let resourceHelpers;

  beforeEach(() => {
    resourceHelpers = new ResourceHelpers();
  });

  describe("get child name", () => {
    it("gets the name of the child state", () => {
      let childName = resourceHelpers.getChildName('cover');
      expect(childName).to.equal('waypoint');
    });
  });

  describe("create view state object", () => {
    let oldState;

    beforeEach(() => {
      oldState = {
        name:    'waypoint',
        waypoint:  '123', 
        curator: 'Marijn' 
      };
    });

    describe("no new state", () => {

      it("keeps the old state", () => {
        let state = resourceHelpers.createViewState(undefined, oldState);
        expect(state).to.deep.equal(oldState);
      });
    });

    describe("no old state", () => {

      it("sets the new state", () => {

        let newState = {
          name:    'cover',
          cover:  '456', 
          curator: 'yeehaa'
        };

        let state = resourceHelpers.createViewState(newState, {});
        expect(state).to.deep.equal(newState);
      });
    });

    describe("no curator", () => {
      it("adds the currents user", () => {

        let newState = {
          name:    'cover',
          cover:  '456', 
        };

        let state = resourceHelpers.createViewState(newState, newState, 'yeehaa');
        expect(newState.curator).to.equal('yeehaa');
      });
    });

    describe("new resource is one level higher in tree", () => {

      it("replaces the old object", () => {

        let newState = {
          name:    'cover',
          cover:  '456', 
          curator: 'yeehaa'
        };

        let state = resourceHelpers.createViewState(newState, oldState);
        expect(state).to.deep.equal(newState);
      });
    });

    describe("new resource is on the same level in tree", () => {

      it("replaces the old object", () => {
        let newState = {
          name:    'waypoint',
          waypoint:  '456', 
          curator: 'yeehaa'
        };

        let state = resourceHelpers.createViewState(newState, oldState);
        expect(state).to.deep.equal(newState);
      });
    });

    describe("new resource is one level lower in tree", () => {

      describe("old resource contains one extra level", () => {
        it("augments the old object", () => {

          let newState = {
            name:       'waypoint',
            waypoint:   '456', 
            curator:    'yeehaa'
          };

          let state = resourceHelpers.createViewState(newState, oldState);
          expect(state.name).to.equal(newState.name);
          expect(state.checkpoint).to.equal(newState.checkpoint);
          expect(state.curator).to.equal(newState.curator);
          expect(state.constellation).to.equal(oldState.constellation);
        });
      });

      describe("old resource contains two extra levels", () => {
        it("augments the old object", () => {
          oldState.waypoint = '345';

          let newState = {
            name:       'checkpoint',
            checkpoint:   '456', 
            curator:    'yeehaa'
          };

          let state = resourceHelpers.createViewState(newState, oldState);

          expect(state.name).to.equal(newState.name);
          expect(state.checkpoint).to.equal(newState.checkpoint);
          expect(state.curator).to.equal(newState.curator);
          expect(state.waypoint).to.equal(oldState.waypoint);
          expect(state.constellation).to.equal(oldState.constellation);
        });
      });
    });
  });
});
