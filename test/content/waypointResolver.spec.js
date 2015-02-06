import WaypointResolver from '../../src/scripts/content/waypoint/waypointResolver';
import ngMock from 'angular-mocks-node';

describe.only("waypointResolver", () => {
  let waypointResolver;
  let Waypoint;
  let $rootScope;
  let $q;
  let waypoint;
  let response;

  beforeEach(() => {

    ngMock.inject(function(_$rootScope_, _$q_){
      $rootScope = _$rootScope_;
      $q = _$q_;
    });

    Waypoint = sinon.spy(); 

    waypoint = { waypoints: '123' };
    let promise = $q.when(waypoint);

    Waypoint.get = sinon.stub().returns(promise);
    Waypoint.getWaypoints = sinon.stub().returns(promise);

    waypointResolver = new WaypointResolver($q, Waypoint);
  });


  describe("without a user and with a regular id", () => {

    beforeEach(() => {
      let view = { waypoint: '456' };
      waypointResolver({view}).then((data) => response = data);
      $rootScope.$apply();
    });

    it("calls the Waypoint service with the right arguments", () => {
      expect(Waypoint.get).not.to.be.called;
    });

    it("returns all the necessary data for the detail page", () => {
      expect(response).to.be.undefined;
    });
  });

  describe("with a user and regular id", () => {

    beforeEach(() => {
      let view = { waypoint: '456', curator: 'yeehaa' }
      waypointResolver({view}).then((data) => response = data);
      $rootScope.$apply();
    });

    it("calls the Waypoint service with the right arguments", () => {
      expect(Waypoint.get).to.be.calledWithExactly('yeehaa', '456');
    });

    it("returns all the necessary data for the detail page", () => {
      expect(response).not.to.be.undefined;
    });
  });

  describe("with a user and new as id", () => {

    beforeEach(() => { 
      let user = 'yeehaa';
      let view = { waypoint: 'new' };
      waypointResolver({user, view}).then((data) => response = data);
      $rootScope.$apply();
    });

    it("returns all the necessary data for the detail page", () => {
      expect(response.model).to.be.an.instanceOf(Waypoint);;
      expect(response.collection).to.be.an.instanceOf(Array);;
    });
  });
});
