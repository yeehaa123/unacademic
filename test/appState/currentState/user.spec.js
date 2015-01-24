import User from '../../../src/scripts/appState/currentState/user';

describe("user", () => {
  let user;

  beforeEach(() => {
    user = new User();

  });

  describe("current user id", () => {

    it("is undefined by default", () => {
      expect(user.get()).to.be.undefined;
    });

    describe("set", () => {
      let userId;
      let setUserId;
      let notification;

      beforeEach(() => {
        userId = 'John123';
        setUserId = user.set(userId);
      });

      it("returns true", () => {
        expect(setUserId).to.be.true;
      });

      it("can be set", () => {
        expect(user.get()).to.equal(userId);
      });
    })
  })
});
