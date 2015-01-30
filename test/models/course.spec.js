import CourseInit from '../../src/scripts/models/course/course';
import ngMock from 'angular-mocks-node';

describe("Course", () => {
  let Course;
  let BaseClass;
  let $q;
  let $rootScope;
  let Waypoint;

  beforeEach(() => {

    ngMock.inject((_$rootScope_, _$q_) => {
      $rootScope = _$rootScope_;
      $q = _$q_;
    });

    Waypoint = {};
    Waypoint.get = sinon.stub();

    BaseClass = sinon.spy();
    BaseClass.get = sinon.stub();
    BaseClass.initialize = sinon.spy();

    Course = new CourseInit($q, BaseClass, Waypoint);
  });

  describe("get", () => {
    let response;
    let userId;
    let courseId;
    let waypointIds;
    let coursePromise;

    beforeEach(() => {

      userId = 'general';
      courseId = '124';
      waypointIds = [1,2];

    });

    describe("with waypoints", () => {

      beforeEach(() => {
        coursePromise = $q.when({
          curator: userId,
          waypoints: waypointIds 
        });

        BaseClass.get.withArgs(userId).returns(coursePromise);
        let waypointsPromise = $q.when(waypointIds);
        Waypoint.get.withArgs(userId, waypointIds).returns(waypointsPromise);
        Course.get(userId, courseId).then((data) => { response = data });
        $rootScope.$apply();
      });

      it("calls get on the baseClass", () => {
        expect(BaseClass.get).calledWith(userId, courseId);
      });

      it("gets the user's courses", () => {
        expect(Waypoint.get).calledWith(userId, waypointIds);
      });

      it("returns the profile and courses", () => {
        expect(response.waypoints.length).to.equal(2);
      });
    });

   describe("without waypoints", () => {

      beforeEach(() => {
        coursePromise = $q.when({
          curator: userId,
        });

        BaseClass.get.withArgs(userId).returns(coursePromise);
        Course.get(userId, courseId).then((data) => { response = data });
        $rootScope.$apply();
      });

      it("calls get on the baseClass", () => {
        expect(BaseClass.get).calledWith(userId, courseId);
      });

      it("gets the user's courses", () => {
        expect(Waypoint.get).not.called;
      });

      it("returns the profile and courses", () => {
        expect(response.waypoints.length).to.equal(0);
      });
    });
  });

  describe("clone", () => {
    let clone;
    let response;
    let promise;
    let spy;
    let course;

    beforeEach(() => {
      course = new Course({ id: '123', curator: 'marijn', waypoints: [1,2]});
      let promise = $q.when(course);
      Waypoint.clone = sinon.stub();

      BaseClass.clone = sinon.stub()
      BaseClass.clone.onCall(0).returns(promise)

      Course.clone('yeehaa', course).then((data) => response = data);
      $rootScope.$apply();
    });

    it("calls clone on the baseclass", () => {
      expect(BaseClass.clone).calledWith('yeehaa', course);;
    });

    it("calls clone on the baseclass", () => {
      expect(Waypoint.clone).called;
    });

    it("returns the clone", () => {
      expect(response).to.be.instanceof(Course);
    });
  });
});
