import CoverInit from '../../src/scripts/models/cover/cover';
import ngMock from 'angular-mocks-node';

describe("Cover", () => {
  let Cover;
  let Course;
  let BaseClass;
  let $q;
  let $rootScope;

  beforeEach(() => {

    ngMock.inject((_$rootScope_, _$q_) => {
      $rootScope = _$rootScope_;
      $q = _$q_;
    });

    Course = {};
    Course.getAll = sinon.stub();

    BaseClass = sinon.spy();
    BaseClass.get = sinon.stub();
    BaseClass.initialize = sinon.spy();

    Cover = new CoverInit($q, BaseClass, Course);
  });

  describe("get", () => {
    let response;

    beforeEach(() => {
      let coverPromise = $q.when({title: 'Mock Title'});
      let coursesPromise = $q.when([1,2]);
      let userId = 'general';

      BaseClass.get.withArgs(userId).returns(coverPromise);
      Course.getAll.withArgs(userId).returns(coursesPromise);
      Cover.get(userId).then((data) => { response = data });
      $rootScope.$apply();
    });

    it("calls get on the baseClass", () => {
      expect(BaseClass.get).called;
    });

    it("gets the user's courses", () => {
      expect(Course.getAll).calledWith('general');
    });

    it("returns the profile and courses", () => {
      expect(response.courses.length).to.equal(2);
    });

  });
});

