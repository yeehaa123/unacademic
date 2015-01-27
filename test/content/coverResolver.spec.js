import CoverResolver from '../../src/scripts/content/cover/coverResolver';
import ngMock from 'angular-mocks-node';

describe("coverResolver", () => {
  let coverResolver;
  let dispatcher;
  let Cover;
  let $rootScope;
  let $q;

  beforeEach(() => {

    Cover = {};
    dispatcher = {};
    dispatcher.getState = sinon.stub().returns({user: '123', resource: '456'});

    let promise = Promise.resolve('hi'); 

    Cover.get = sinon.stub().returns(promise);
    coverResolver = new CoverResolver(Cover, dispatcher);
  });

  describe("index resolver", () => {
    let response;

    beforeEach(() => {
      response = coverResolver();
    });

    it("calls the dispatcher to get the current user", () => {
      expect(dispatcher.getState).to.be.called;
    });

    it("calls the CoverInfo service with the right arguments", () => {
      expect(Cover.get).to.be.calledWith('123', 'info');
    });


    it("returns all the necessary data for the detail page", () => {
      return expect(response).to.eventually.equal('hi');
    });
  });
});
