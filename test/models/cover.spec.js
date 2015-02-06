import CoverInit from '../../src/scripts/models/cover/cover';
import ngMock from 'angular-mocks-node';

describe("Cover", () => {
  let Cover;
  let Constellation;
  let BaseClass;
  let $q;
  let $rootScope;

  beforeEach(() => {

    ngMock.inject((_$rootScope_, _$q_) => {
      $rootScope = _$rootScope_;
      $q = _$q_;
    });

    Constellation = {};
    Constellation.getAll = sinon.stub();

    BaseClass = sinon.spy();
    BaseClass.get = sinon.stub();
    BaseClass.initialize = sinon.spy();

    Cover = new CoverInit($q, BaseClass, Constellation);
  });

  describe("get", () => {
    let response;
    let userId;

    describe("with a user", () => {
      beforeEach(() => {
        let coverPromise = $q.when({title: 'Mock Title'});
        let constellationsPromise = $q.when([1,2]);
        userId = 'yeehaa';

        BaseClass.get.withArgs(userId).returns(coverPromise);
        Constellation.getAll.withArgs().returns(constellationsPromise);
        Constellation.getAll.withArgs(userId).returns(constellationsPromise);
        Cover.get(userId).then((data) => { response = data });
        $rootScope.$apply();
      });

      it("calls get on the baseClass", () => {
        expect(BaseClass.get).calledWith(userId);
      });

      it("gets all the constellations", () => {
        expect(Constellation.getAll).calledWith().at.firstCall;
      });

      it("gets the user's constellations", () => {
        expect(Constellation.getAll).calledWith('yeehaa').at.secondCall;
      });

      it("returns the profile and constellations", () => {
        expect(response.cover.title).to.equal('Mock Title');
        expect(response.constellations.length).to.equal(2);
      });
    });

    describe("without a user", () => {
      beforeEach(() => {
        let coverPromise = $q.when({title: 'Mock Title'});
        let constellationsPromise = $q.when([1,2]);
        userId = 'general';

        BaseClass.get.withArgs(userId).returns(coverPromise);
        Constellation.getAll.withArgs().returns(constellationsPromise);
        Cover.get(userId).then((data) => { response = data });
        $rootScope.$apply();
      });

      it("calls get on the baseClass", () => {
        expect(BaseClass.get).calledWith(userId);
      });

      it("gets the user's constellations", () => {
        expect(Constellation.getAll).calledWith();
      });

      it("returns the profile and constellations", () => {
        expect(response.constellations.length).to.equal(2);
      });
    });
  });
});

