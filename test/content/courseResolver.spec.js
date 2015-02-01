import CourseResolver from '../../src/scripts/content/course/courseResolver';
import ngMock from 'angular-mocks-node';

describe("courseResolver", () => {
  let courseResolver;
  let Course;
  let $rootScope;
  let $q;
  let course;

  beforeEach(() => {

    ngMock.inject(function(_$rootScope_, _$q_){
      $rootScope = _$rootScope_;
      $q = _$q_;
    });

    Course = sinon.spy(); 

    course = { waypoints: '123' };
    let promise = $q.when(course);

    Course.get = sinon.stub().returns(promise);
    Course.getWaypoints = sinon.stub().returns(promise);

    courseResolver = new CourseResolver($q, Course);
  });

  describe("details resolver", () => {
    let response;

    describe("without a user and with a regular id", () => {

      beforeEach(() => {
        let view = { course: '456' };
        courseResolver({view}).then((data) => response = data);
        $rootScope.$apply();
      });

      it("calls the Course service with the right arguments", () => {
        expect(Course.get).not.to.be.called;
      });

      it("returns all the necessary data for the detail page", () => {
        expect(response).to.be.undefined;
      });
    });

    describe("with a user and regular id", () => {

      beforeEach(() => {
        let view = { course: '456', curator: 'yeehaa' }
        courseResolver({view}).then((data) => response = data);
        $rootScope.$apply();
      });

      it("calls the Course service with the right arguments", () => {
        expect(Course.get).to.be.calledWithExactly('yeehaa', '456');
      });

      it("calls the Course service with the right arguments", () => {
        expect(Course.getWaypoints).calledWith(course);
      });

      it("returns all the necessary data for the detail page", () => {
        expect(response).not.to.be.undefined;
      });
    });

    describe("with a user and new as id", () => {

      beforeEach(() => { 
        let view = { course: 'new', curator: 'yeehaa' }
        courseResolver({view}).then((data) => response = data);
        $rootScope.$apply();
      });

      it("returns all the necessary data for the detail page", () => {
        expect(response).to.be.an.instanceOf(Course);;
      });
    });
  });
});
