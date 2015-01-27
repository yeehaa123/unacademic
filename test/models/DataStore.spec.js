import DS from '../../src/scripts/models/DataStore/DataStore'
import ngMock from 'angular-mocks-node';

describe("DataStore", () => {
  let DataStore;
  let $httpBackend;
  let userId;
  let utilities;
  let $q;
  let $http;

  beforeEach(() => {

    ngMock.inject(function(_$q_, _$http_, _$httpBackend_){
      $q = _$q_;
      $http = _$http_;
      $httpBackend = _$httpBackend_;
    });

    userId = 'general'
    let baseUrl = '';

    utilities = {};
    utilities.generateUrl = sinon.stub();

    DataStore = new DS(baseUrl, $http, $q, utilities);

  });

  afterEach(() =>  {
    $httpBackend.flush();
    expect(utilities.generateUrl).calledWith('CoverInfo', userId);
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe("get", () => {

    describe("single id", ()=> {
      beforeEach(() => {
        utilities.generateUrl.returns('/bla.com');
        $httpBackend.when('GET', '/bla.com').respond({status: 200});
      });

      it("gets the info", () => {
        DataStore.get('CoverInfo', userId)
          .then((data) => { expect(data.status).to.equal(200) });
      });
    });

    describe("collection of id", ()=> {
      beforeEach(() => {
        utilities.generateUrl.onCall(0).returns('/123.com');
        utilities.generateUrl.onCall(1).returns('/456.com');
        $httpBackend.when('GET', '/123.com').respond({status: 200});
        $httpBackend.when('GET', '/456.com').respond({status: 200});
      });

      it("gets the info", () => {
        DataStore.get('CoverInfo', userId, [123, 456])
          .then((data) => { expect(data.length).to.equal(2) });
      });
    });
  });

  describe("save", () => {

    beforeEach(() => {
      utilities.generateUrl.returns('/bla.com');
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
