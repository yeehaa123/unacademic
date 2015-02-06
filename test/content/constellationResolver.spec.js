import ConstellationResolver from '../../src/scripts/content/constellation/constellationResolver';
import ngMock from 'angular-mocks-node';

describe("constellationResolver", () => {
  let constellationResolver;
  let Constellation;
  let $rootScope;
  let $q;
  let constellation;

  beforeEach(() => {

    ngMock.inject(function(_$rootScope_, _$q_){
      $rootScope = _$rootScope_;
      $q = _$q_;
    });

    Constellation = sinon.spy(); 

    constellation = { waypoints: '123' };
    let promise = $q.when(constellation);

    Constellation.get = sinon.stub().returns(promise);
    Constellation.getWaypoints = sinon.stub().returns(promise);

    constellationResolver = new ConstellationResolver($q, Constellation);
  });

  describe("details resolver", () => {
    let response;

    describe("without a user and with a regular id", () => {

      beforeEach(() => {
        let view = { constellation: '456' };
        constellationResolver({view}).then((data) => response = data);
        $rootScope.$apply();
      });

      it("calls the Constellation service with the right arguments", () => {
        expect(Constellation.get).not.to.be.called;
      });

      it("returns all the necessary data for the detail page", () => {
        expect(response).to.be.undefined;
      });
    });

    describe("with a user and regular id", () => {

      beforeEach(() => {
        let view = { constellation: '456', curator: 'yeehaa' }
        constellationResolver({view}).then((data) => response = data);
        $rootScope.$apply();
      });

      it("calls the Constellation service with the right arguments", () => {
        expect(Constellation.get).to.be.calledWithExactly('yeehaa', '456');
      });

      it("calls the Constellation service with the right arguments", () => {
        expect(Constellation.getWaypoints).calledWith(constellation);
      });

      it("returns all the necessary data for the detail page", () => {
        expect(response).not.to.be.undefined;
      });
    });

    describe("with a user and new as id", () => {

      beforeEach(() => { 
        let user = 'yeehaa';
        let view = { constellation: 'new' };
        constellationResolver({user, view}).then((data) => response = data);
        $rootScope.$apply();
      });

      it("returns all the necessary data for the detail page", () => {
        expect(response.model).to.be.an.instanceOf(Constellation);;
        expect(response.collection).to.be.an.instanceOf(Array);;
      });
    });
  });
});
