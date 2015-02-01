import Rules from '../../../src/scripts/appState/permission/checkRules';
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

    rules = new Rules($log);
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

    it("is not allowed to switch to learning", () => {
      let proposal = { mode: 'learning' }
      isAllowed = rules.check(proposal);
      expect(isAllowed).to.be.false;
      expect($log.warn.logs.length).to.equal(1);
      expect($log.warn.logs[0][0]).to.contain('signing in');
    });

    it("is not allowed to switch to curation", () => {
      let proposal = { mode: 'curation' };
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

    describe("switch to browsing", () => {
      it("is allowed to switch", () => {
        let proposal = { mode: 'browsing', user };
        isAllowed = rules.check(proposal);
        expect(isAllowed).to.be.true;
      });
    });

    describe("switch to learning", () => {

      describe("when user is curator", () => {
        it("is not allowed to switch", () => {
          let proposal = { mode: 'learning', user, view: { curator: 'ba' } };
          isAllowed = rules.check(proposal);
          expect(isAllowed).to.be.false;
          expect($log.warn.logs.length).to.equal(1);
          expect($log.warn.logs[0][0]).to.contain('curate');
        });

        it("is allowed to switch", () => {
          let proposal = { mode: 'learning', user, view: { curator: user } };
          isAllowed = rules.check(proposal);
          expect(isAllowed).to.be.true;
        });
      });
    });

    describe("switch to curation", () => {

      describe("when user is curator", () => {
        it("is not allowed to switch", () => {
          let proposal = { mode: 'learning', user, view: { curator: 'ba' } };
          isAllowed = rules.check(proposal);
          expect(isAllowed).to.be.false;
          expect($log.warn.logs.length).to.equal(1);
          expect($log.warn.logs[0][0]).to.contain('curate');
        });

        it("is allowed to learning", () => {
          let proposal = { mode: 'learning', user, view: { curator: user } };
          isAllowed = rules.check(proposal);
          expect(isAllowed).to.be.true;
        });
      });
    });
  });
})
