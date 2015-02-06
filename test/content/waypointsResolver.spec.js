import WaypointsResolver from '../../src/scripts/content/waypoints/waypointsResolver';
import ngMock from 'angular-mocks-node';

describe("waypointsResolver", () => {
  let waypointsResolver;
  let Waypoint;
  let Cover;
  let $rootScope;
  let $q;

  beforeEach(() => {

    ngMock.inject(function(_$rootScope_, _$q_){
      $rootScope = _$rootScope_;
      $q = _$q_;
    });

    Waypoint = sinon.spy(); 
    Cover = sinon.spy();

    let coverPromise = $q.when({cover: '123'});
    let waypointPromise = $q.when('456');

    Cover.get = sinon.stub().returns(coverPromise);
    Waypoint.getAll = sinon.stub().returns(waypointPromise);

    waypointsResolver = new WaypointsResolver(Waypoint, Cover, $q);
  });

  describe("mode is browse", () => {
    let response;
    let mode;
    let user;

    describe("mode is browse, without a user", () => {

      beforeEach(() => {
        mode = 'browse';
        waypointsResolver({user, mode}).then((data) => response = data);
        $rootScope.$apply();
      });

      it("calls the Cover service with the right arguments", () => {
        expect(Cover.get).to.be.calledWith('general', 'info');
      });

      it("calls the Waypoint service with the right arguments", () => {
        expect(Waypoint.getAll).to.be.calledWith(undefined);
      });

      it("returns all the necessary data for the detail page", () => {
        expect(response.model).to.equal('123');
        expect(response.collection).to.equal('456');
      });
    });

    describe("mode is not browse, with user", () => {

      beforeEach(() => {
        mode = 'learn';
        user = 'yeehaa';
        waypointsResolver({user, mode}).then((data) => response = data);
        $rootScope.$apply();
      });

      it("calls the Cover service with the right arguments", () => {
        expect(Cover.get).to.be.calledWith('yeehaa', 'info');
      });

      it("calls the Waypoint service with the right arguments", () => {
        expect(Waypoint.getAll).to.be.calledWith('yeehaa');
      });

      it("returns all the necessary data for the detail page", () => {
        expect(response.model).to.equal('123');
        expect(response.collection).to.equal('456');
      });
    });
  });
});
