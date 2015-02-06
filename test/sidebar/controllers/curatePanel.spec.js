import CuratePanelCtrl from '../../../src/scripts/sidebar/panels/controllers/curatePanel.js';
import ngMock from 'angular-mocks-node';

describe("CuratePanelCtrl", () => {
  let curatePanel;
  let formHelpers;
  let $scope;
  let dispatcher;
  let resourceHelpers;

  beforeEach(function () {
    ngMock.inject(($rootScope) => {
      $scope = $rootScope.$new();
    });

    formHelpers = {};
    resourceHelpers = {};
    dispatcher = {};

    curatePanel = new CuratePanelCtrl($scope, dispatcher, formHelpers, resourceHelpers);
  });

  describe("initialize",() => {

    it('creates a new form', () => {
      expect(curatePanel.form).not.to.be.undefined;
    });

    it('sets its own template', () => {
      curatePanel.model = { resourceName: 'Course' };
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

  });
  describe("add new", () => {

    beforeEach(() => {
      curatePanel.model = {
        resourceName: 'cover'
      };
      resourceHelpers.getChildName = sinon.stub().returns('course');
      dispatcher.setState = sinon.spy();
      dispatcher.getState = sinon.stub().returns({ user: 'yeehaa' });
      curatePanel.addNew();
    });

    it("gets the child name", () => {
      expect(resourceHelpers.getChildName).calledWith('cover');
    });

    it("sets the new state", () => {
      let state = { curator: 'yeehaa', name: 'course', course: 'new' };
      expect(dispatcher.setState).calledWith({view: state});
    });
  });
});
