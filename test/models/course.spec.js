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

  describe("clone", () => {
    let clone;
    let response;
    let promise;
    let spy;
    let course;

    beforeEach(() => {
      course = { id: '123', curator: 'marijn', waypoints: [1,2]};
      let coursePromise = $q.when(course);
      Waypoint.clone = sinon.stub()

      let waypoints = {a: 1, b: 2};
      let waypointsPromise = $q.when(waypoints); 
      Waypoint.get.returns(waypointsPromise);

      BaseClass.clone = sinon.stub()
      BaseClass.clone.onCall(0).returns(coursePromise)

      Course.clone('yeehaa', course).then((data) => response = data);
      $rootScope.$apply();
    });

    it("calls clone on the baseclass", () => {
      expect(BaseClass.clone).calledWith('yeehaa', course);;
    });

    it("gets the waypoints", () => {
      expect(Waypoint.get).calledWith('marijn', [1,2]);
    });

    it("calls clone on waypoints", () => {
      expect(Waypoint.clone).calledWith('marijn', 1);
      expect(Waypoint.clone).calledWith('marijn', 2);
    });

    it("returns the clone", () => {
      expect(response).to.equal(course);
    });
  });
});
