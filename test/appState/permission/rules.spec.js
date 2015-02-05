import Rules from '../../../src/scripts/appState/permission/rules';
import ngMock from 'angular-mocks-node';

describe("Rules", () => {
  let rules;
  let $log;
  let isAllowed;
  let user;

  beforeEach(() => {
    ngMock.inject(function( _$log_){
      $log = _$log_;
    });

    let appModes = ['browse', 'learn', 'curate'];
    rules = new Rules($log, appModes);
  });

  describe("invalid app mode", () => {

    it("is not allowed to switch", () => {
      let proposal = { mode: 'bla' };
      isAllowed = rules.check(proposal);
      expect(isAllowed).to.be.false;
      expect($log.warn.logs.length).to.equal(1);
      expect($log.warn.logs[0][0]).to.contain('appmode');
    });
  });

  describe("queue is full", () => {

    it("is not allowed to switch", () => {
      let proposal = { queue: new Set([1,2,3]) }
      isAllowed = rules.check(proposal);
      expect(isAllowed).to.be.false;
      expect($log.warn.logs.length).to.equal(1);
      expect($log.warn.logs[0][0]).to.contain('locked');
    });
  });

  describe("without a current user", () => {

    it("is not allowed to switch to learn", () => {
      let proposal = { mode: 'learn' }
      isAllowed = rules.check(proposal);
      expect(isAllowed).to.be.false;
      expect($log.warn.logs.length).to.equal(1);
      expect($log.warn.logs[0][0]).to.contain('signing in');
    });

    it("is not allowed to switch to curate", () => {
      let proposal = { mode: 'curate' };
      isAllowed = rules.check(proposal);
      expect(isAllowed).to.be.false;
      expect($log.warn.logs.length).to.equal(1);
      expect($log.warn.logs[0][0]).to.contain('signing in');
    });

    it("is allowed to switch routes", () => {
      let proposal = { view: '345' };
      isAllowed = rules.check(proposal);
      expect(isAllowed).to.be.true;
    });
  });

  describe("with a current user", () => {

    beforeEach(() => {
      user = 'yeehaa';
    });

    describe("switch to browse", () => {
      it("is allowed to switch", () => {
        let proposal = { mode: 'browse', user };
        isAllowed = rules.check(proposal);
        expect(isAllowed).to.be.true;
      });
    });

    describe("switch to learn", () => {

      describe("when user is curator", () => {
        xit("is not allowed to switch", () => {
          let proposal = { mode: 'learn', user, view: { curator: 'ba' } };
          isAllowed = rules.check(proposal);
          expect(isAllowed).to.be.false;
          expect($log.warn.logs.length).to.equal(1);
          expect($log.warn.logs[0][0]).to.contain('curate');
        });

        it("is allowed to switch", () => {
          let proposal = { mode: 'learn', user, view: { curator: user } };
          isAllowed = rules.check(proposal);
          expect(isAllowed).to.be.true;
        });
      });
    });

    describe("switch to curate", () => {

      describe("when user is curator", () => {
        xit("is not allowed to switch", () => {
          let proposal = { mode: 'learn', user, view: { curator: 'ba' } };
          isAllowed = rules.check(proposal);
          expect(isAllowed).to.be.false;
          expect($log.warn.logs.length).to.equal(1);
          expect($log.warn.logs[0][0]).to.contain('curate');
        });

        it("is allowed to learn", () => {
          let proposal = { mode: 'learn', user, view: { curator: user } };
          isAllowed = rules.check(proposal);
          expect(isAllowed).to.be.true;
        });
      });
    });
  });
})
