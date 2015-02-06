import ConstellationInit from '../../src/scripts/models/constellation/constellation';
import ngMock from 'angular-mocks-node';

describe("Constellation", () => {
  let Constellation;
  let BaseClass;
  let $q;
  let $rootScope;
  let Waypoint;

  beforeEach(() => {

    ngMock.inject((_$rootScope_, _$q_) => {
      $rootScope = _$rootScope_;
      $q = _$q_;
    });

    Waypoint = {};
    Waypoint.get = sinon.stub();

    BaseClass = sinon.spy();
    BaseClass.get = sinon.stub();
    BaseClass.initialize = sinon.spy();

    Constellation = new ConstellationInit($q, BaseClass, Waypoint);
  });

  // test getWaypoints instead....
  describe("getWaypoints", () => {
    let response;
    let userId;
    let constellationId;
    let waypointIds;
    let constellationPromise;

    beforeEach(() => {
      userId = 'general';
      constellationId = '124';
      waypointIds = [1,2];
    });

    describe("with waypoints", () => {

      beforeEach(() => {
        let constellation = {
          curator: userId,
          waypoints: waypointIds,
          clonedFrom: 'yeehaa'
        };

        let waypointsPromise = $q.when(waypointIds);
        Waypoint.get.withArgs(userId, waypointIds).returns(waypointsPromise);
        Constellation.getWaypoints(constellation).then((data) => { response = data });
        $rootScope.$apply();
      });

      it("gets the user's constellations", () => {
        expect(Waypoint.get).calledWith(userId, waypointIds);
      });

      it("returns the profile and constellations", () => {
        expect(response.waypoints.length).to.equal(2);
      });
    });

   describe("without waypoints", () => {

      beforeEach(() => {
        let constellation = {
          curator: userId,
        };

        Constellation.getWaypoints(userId, constellationId).then((data) => { response = data });
        $rootScope.$apply();
      });


      it("gets the user's constellations", () => {
        expect(Waypoint.get).not.called;
      });

      it("returns the profile and constellations", () => {
        expect(response.waypoints.length).to.equal(0);
      });
    });
  });

  describe("clone", () => {
    let clone;
    let response;
    let promise;
    let spy;
    let constellation;

    beforeEach(() => {
      constellation = { id: '123', curator: 'marijn', waypoints: [1,2]};
      let constellationPromise = $q.when(constellation);
      Waypoint.clone = sinon.stub()

      let waypoints = {a: 1, b: 2};
      let waypointsPromise = $q.when(waypoints); 
      Waypoint.get.returns(waypointsPromise);

      BaseClass.clone = sinon.stub()
      BaseClass.clone.onCall(0).returns(constellationPromise)

      Constellation.clone('yeehaa', constellation).then((data) => response = data);
      $rootScope.$apply();
    });

    it("calls clone on the baseclass", () => {
      expect(BaseClass.clone).calledWith('yeehaa', constellation);;
    });

    it("gets the waypoints", () => {
      expect(Waypoint.get).calledWith('marijn', [1,2]);
    });

    it("calls clone on waypoints", () => {
      expect(Waypoint.clone).calledWith('marijn', 1);
      expect(Waypoint.clone).calledWith('marijn', 2);
    });

    it("returns the clone", () => {
      expect(response).to.equal(constellation);
    });
  });
});
