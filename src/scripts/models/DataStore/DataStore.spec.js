import DS from './DataStore'
import ngMock from 'angular-mocks-node';

describe("DataStore", () => {
  let DataStore;
  let $httpBackend;
  let userId;
  let utilities;

  beforeEach(() => {
    let $http;
    let $q;

    ngMock.inject(function(_$q_, _$http_, _$httpBackend_){
      $q = _$q_;
      $http = _$http_;
      $httpBackend = _$httpBackend_;
    });

    userId = 'general'
    let baseUrl = '';

    utilities = {};
    utilities.generateUrl = sinon.stub();
    utilities.generateUrl.returns('/bla.com');

    DataStore = new DS(baseUrl, $http, $q, utilities);

  });

  afterEach(() =>  {
    $httpBackend.flush();
    expect(utilities.generateUrl).calledWith('CoverInfo', userId);
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe("get", () => {

    beforeEach(() => {
      $httpBackend.when('GET', '/bla.com').respond({status: 200});
    });

    it("gets the info", () => {
      DataStore.get('CoverInfo', userId)
        .then((data) => { expect(data.status).to.equal(200) });
    });
  });

  describe("save", () => {

    beforeEach(() => {
      $httpBackend.when('PUT', '/bla.com').respond(200);
    });

    it("saves the info", () => {
      let instance = new CoverInfo(userId);

      DataStore.save(instance)
        .then((data) => { expect(data.status).to.equal(200) });
    });
  });
})

function CoverInfo(userId){
  this.curator = userId;
}
