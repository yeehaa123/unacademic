import TimeStamp from './timestamp';

describe("timestamp", () => {
  let timestamp;

  beforeEach(() => {
    timestamp = new TimeStamp();

  });

  describe("timestamp name", () => {

    it("is set to its internal value on subsequent calls", () => {
      expect(timestamp.get()).to.be.undefined;
    });

    describe("set", () => {
      let time;
      let setTime;

      beforeEach(() => {
        time = '123';
        setTime = timestamp.set(time);
      });


      it("returns true", () => {
        expect(setTime).to.be.true;
      });

      it("can be set", () => {
        expect(timestamp.get()).to.equal(time);
      });
    })
  })
});
