import ToolboxCtrl from '../../../src/scripts/sidebar/controllers/toolbox.js';
import ngMock from 'angular-mocks-node';

describe("Toolbox", () => {
  let toolbox;
  let dispatcher;
  let navHelpers;
  let $scope;

  beforeEach(function () {

    ngMock.inject(function ($rootScope, _$q_) {
      $scope = $rootScope.$new();
    });

    dispatcher = {};
    navHelpers = {};

    dispatcher.getState = sinon.stub().returns({mode: 'browsing'});
    dispatcher.getModes = sinon.stub().returns(['browsing', 'learning', 'curation']);
    dispatcher.setState = sinon.stub();
    dispatcher.registerObserverCallback = sinon.stub();
    navHelpers.goBack = sinon.spy();
    navHelpers.goForward = sinon.spy();

    toolbox = new ToolboxCtrl($scope, dispatcher, navHelpers);
  });

  describe("initialize",() => {

    describe("app modes", () => {
      it("gets the app modes", () => {
        expect(dispatcher.getModes).called;
      });
    });

    describe("nav props", () => {
      it("sets the other vm props", () => {
        expect(toolbox.back).not.to.be.undefined;
        expect(toolbox.forward).not.to.be.undefined;
      });
    });

    describe("other props", () => {
      it("sets the other vm props", () => {
        expect(toolbox.modes).not.to.be.undefined;
        expect(toolbox.signIn).not.to.be.undefined;
        expect(toolbox.checkMode).not.to.be.undefined;
      });
    });

  });

  describe("navigation", () => {

    it("wires up navhelpers.back", () => {
      toolbox.back();
      expect(navHelpers.goBack).to.be.called;
    });

    it("wires up navhelpers.forward", () => {
      toolbox.forward();
      expect(navHelpers.goForward).to.be.called;
    });
  });

  describe("signing in", () => {

    it("sets the state", () => {
      toolbox.signIn();
      expect(dispatcher.setState).to.be.called;
    });

  });

  describe("check mode", () => {

    beforeEach(() => {
      toolbox.checkMode('learning');
    });

    it('keeps the old mode', () => {
      expect(toolbox.mode).to.equal(undefined);
    });

    it("sets the state", () => {
      expect(dispatcher.setState).to.be.calledWith({mode: 'learning'});
    });

  });

  describe("state switching", () => {
    it("sets the mode to learning", () => {
      toolbox.buttonMode = "browsing";
      toolbox.mode = "learning";
      $scope.$apply();
      expect(toolbox.buttonMode).to.equal('learning');
    });
  });
});
