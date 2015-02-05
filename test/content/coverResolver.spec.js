import CoverResolver from '../../src/scripts/content/cover/coverResolver';
import ngMock from 'angular-mocks-node';

describe("coverResolver", () => {
  let coverResolver;
  let dispatcher;
  let Cover;
  let $rootScope;
  let $q;

  beforeEach(() => {

    ngMock.inject((_$rootScope_, _$q_) => {
      $rootScope = _$rootScope_;
      $q = _$q_;
    });

    Cover = {};
    let promise = $q.when({cover: '1', courses: '2'}); 
    Cover.get = sinon.stub().returns(promise);

    coverResolver = new CoverResolver(Cover, $q);
  });

  describe("index resolver", () => {
    let response;

    describe("mode is browse", () => {

      beforeEach(() => {
        let params = {user: 'yeehaa', mode: 'browse' }
        coverResolver(params).then((data) => response = data);
        $rootScope.$digest();
      });

      it("calls the CoverInfo service with the right arguments", () => {
        expect(Cover.get).to.be.calledWith('general', 'info');
      });

      it("sets the model data", () => {
        expect(response.model).not.to.be.undefined;
      });

      it("sets the collection data", () => {
        expect(response.collection).not.to.be.undefined;
      });
    })

    describe("mode is curation / learning", () => {

      beforeEach(() => {
        var params = {user: 'yeehaa', mode: 'curation' }
        coverResolver(params).then((data) => response = data);
        $rootScope.$digest();
      });

      it("calls the CoverInfo service with the right arguments", () => {
        expect(Cover.get).to.be.calledWith('yeehaa', 'info');
      });

      it("sets the model data", () => {
        expect(response.model).not.to.be.undefined;
      });

      it("sets the collection data", () => {
        expect(response.collection).not.to.be.undefined;
      });
    })
  });
});
