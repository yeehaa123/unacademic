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
    let promise = Promise.resolve({}); 
    Cover.get = sinon.stub().returns(promise);

    coverResolver = new CoverResolver(Cover, dispatcher);
  });

  describe("index resolver", () => {
    let response;

    beforeEach(() => {
      response = coverResolver({user: 'yeehaa'});
    });

    it("calls the CoverInfo service with the right arguments", () => {
      expect(Cover.get).to.be.calledWith('yeehaa', 'info');
    });

    it("returns all the necessary data for the detail page", () => {
      return expect(response).to.eventually.not.be.undefined;
    });
  });
});
