import CuratePanelCtrl from '../../../src/scripts/sidebar/controllers/curatePanel.js';
import ngMock from 'angular-mocks-node';

describe("CuratePanelCtrl", () => {
  let curatePanel;
  let formHelpers;
  let $scope;
  let dispatcher;

  beforeEach(function () {
    ngMock.inject(($rootScope) => {
      $scope = $rootScope.$new();
    });

    formHelpers = {};
    dispatcher = {};

    curatePanel = new CuratePanelCtrl($scope, dispatcher, formHelpers);
  });

  describe("initialize",() => {

    it('creates a new form', () => {
      expect(curatePanel.form).not.to.be.undefined;
    });

    it('sets its own template', () => {
      curatePanel.model = { constructor: { name: 'Course' }};
      let templateUrl = curatePanel.getTemplateUrl();
      expect(templateUrl).to.equal('./scripts/content/course/panels/curate.html');
    });
  });

  describe("actions",() => {

    beforeEach(() => {
      curatePanel.form = '123';
      curatePanel.model = {id: '456'};
    });

    it('wires up the submit button', () => {
      formHelpers.submit = sinon.spy();
      curatePanel.submit();
      expect(formHelpers.submit).calledWith('123', {id: '456'});
    });

    it("watches the form for changes", () => {
      formHelpers.checkForm = sinon.spy();
      $scope.$digest();
      expect(formHelpers.checkForm).calledWith('123', '456');
    });

    describe("add new waypoint", () => {
      
      beforeEach(() => {
        dispatcher.setState = sinon.spy();
        curatePanel.model.addNewChild = sinon.spy();
      });

      describe("new courses, checkpoints or objectives", () => {

        beforeEach(() => {
          curatePanel.addNew();
        });

        it("wires up the addNew button", () => {
          expect(curatePanel.model.addNewChild).called;
        });

        it("does not store a reference to the parent course", ()=> {
          expect(dispatcher.setState).not.called;
        });
      });

      describe('new waypoints on a course', () => {

        beforeEach(() => {
          curatePanel.model.constructor = { name: 'Course' };
          curatePanel.addNew();
        });

        it("wires up the addNew button", () => {
          expect(curatePanel.model.addNewChild).called;
        });

        it("stores a reference to the parent course", ()=> {
          expect(dispatcher.setState).called;
        });
      });
    });
  });
});
