import CourseResolver from '../../src/scripts/content/course/courseResolver';
import ngMock from 'angular-mocks-node';

describe("courseResolver", () => {
  let courseResolver;
  let Course;
  let $rootScope;
  let $q;

  beforeEach(() => {

    ngMock.inject(function(_$rootScope_, _$q_){
      $rootScope = _$rootScope_;
      $q = _$q_;
    });

    Course = () => {};
    Course.schema = '123';


    let course = {
      waypoints: '123'
    }

    let promise = $q.when(course);

    Course.getAll = sinon.stub().returns(promise);
    Course.get = sinon.stub().returns(promise);

    courseResolver = new CourseResolver($q, Course);

  });

  describe("details resolver", () => {
    let response;

    describe("without a user and with a regular id", () => {

      beforeEach(() => {
        courseResolver({resource: '456'}).then((data) => {
          response = data;
        });
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

        let resource = {
          id: '456',
          curator: 'yeehaa'
        }

        courseResolver(resource).then((data) => {
          response = data;
        });

        $rootScope.$apply();
      });

      it("calls the Course service with the right arguments", () => {
        expect(Course.get).to.be.calledWithExactly('yeehaa', '456');
      });

      it("returns all the necessary data for the detail page", () => {
        expect(response).not.to.be.undefined;
      });
    });

    describe("with a user and new as id", () => {

      beforeEach(() => {
        let resource = {
          id: '456',
          curator: 'yeehaa'
        }

        courseResolver(resource).then(function(data){
          response = data;
        });
        $rootScope.$apply();
      });

      it("returns all the necessary data for the detail page", () => {
        expect(response).not.to.be.undefined;
      });
    });
  });
});
