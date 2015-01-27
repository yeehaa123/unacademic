import CoverResolver from '../../src/scripts/content/cover/coverResolver';
import ngMock from 'angular-mocks-node';

xdescribe("coverResolver", () => {
  let coverResolver;
  let dispatcher;
  let Cover;
  let Course;
  let $rootScope;
  let $q;

  beforeEach(() => {

    ngMock.inject(function(_$rootScope_, _$q_){
      $rootScope = _$rootScope_;
      $q = _$q_;
    });

    dispatcher = {};
    dispatcher.getState = sinon.stub().returns({user: '123', resource: '456'});

    Cover = {
      schema: '123'
    };

    Course = () => {};
    Course.schema = '123';

    let promise = $q.when('123');

    Cover.get = sinon.stub().returns(promise);
    Course.getAll = sinon.stub().returns(promise);

    coverResolver = new CoverResolver($q, Cover, Course, dispatcher);
  });

  describe("index resolver", () => {
    let response;

    beforeEach(() => {
      coverResolver().then((data) => {
        response = data;
      });

      $rootScope.$apply();
    });

    it("calls the dispatcher to get the current user", () => {
      expect(dispatcher.getState).to.be.called;
    });

    it("calls the CoverInfo service with the right arguments", () => {
      expect(Cover.get).to.be.calledWith('123', 'info');
    });

    it("calls the Course service with the right arguments", () => {
      expect(Course.getAll).to.be.calledWith('123');
    });

    it("returns all the necessary data for the detail page", () => {
      expect(response.name).not.to.be.undefined;
      expect(response.info).not.to.be.undefined;
      expect(response.cards).not.to.be.undefined;
      expect(response.schema).not.to.be.undefined;
    });
  });
});
