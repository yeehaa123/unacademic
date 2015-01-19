import History from './history.js';

describe("history", () => {
  var history;
  var status;

  beforeEach(() => {

    history = new History()
    status = history.status;
  });

  describe("initialize", () => {
    beforeEach(() => {
      history.initialize();
    });

    it("is empty", () => {
      expect(status().length).to.equal(0);
    });

    it("has an index of 0", () => {
      expect(status().index).to.equal(0);
    });
  });

  describe("time travel", () => {
    var state1;
    var state2;
    var state3;
    var state4;
    var state5;

    beforeEach(() => {

      state1 = {
        waypoints: 'waypoints.detail',
      }

      state2 = {
        waypoints: 'waypoints.index',
      }

      state3 = {
        waypoints: 'waypoints.other',
      }

      state4 = {
        waypoints: 'waypoints.any',
      }

      state5 = {
        waypoints: 'waypoints.any',
        timestamp: '123'
      }

      history.initialize();
      history.add(state1);
      history.add(state2);
      expect(status().length).to.equal(2);
    });

    describe("previous", () => {

      it("return the previous state", () => {
        expect(history.previous()).to.equal(state1);
        expect(status().index).to.equal(1);
      });

      it("returns the last state if at beginning", () => {
        history.previous();
        history.previous();
        expect(status().index).to.equal(1);
        expect(history.previous()).to.equal(state1);
      });
    });

    describe("next", () => {
      beforeEach(() => {
        history.previous();
      });

      it("return the next state", () => {
        expect(history.next()).to.equal(state2);
        expect(status().index).to.equal(0);
      });

      it("returns the first state if at end", () => {
        history.next();
        expect(history.next()).to.equal(state2);
        expect(status().index).to.equal(0);
      });
    });

    describe("reset", () => {

      beforeEach(() => {
        history.previous();
        history.add(state3);
        history.add(state4);
      });

      it("adds the state to the history", () => {
        expect(status().length).to.equal(3);
        expect(status().index).to.equal(0);
        expect(history.get()).to.contain(state3);
      });

      it("removes the detour from the history", () => {
        expect(history.get()).not.to.contain(state2);
      });

      it("resets the index", () => {
        expect(history.previous()).to.equal(state3);
      });
    });

    describe("with timestamp", () => {
      beforeEach(() => {
        expect(status().length).to.equal(2);
        history.previous();
        history.add(state5);
      });

      it("does not add the state to the history", () => {
        expect(status().index).to.equal(1);
        expect(history.get().length).to.equal(2);
        expect(history.get()).not.to.contain(state5);
      });

      it("does not reset the index", () => {
        expect(history.next()).to.equal(state2);
        expect(status().index).to.equal(0);
      });
    });
  });
});
