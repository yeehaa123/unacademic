import CuratePanelCtrl from '../../../src/scripts/sidebar/controllers/curatePanel.js';
import ngMock from 'angular-mocks-node';

describe("CuratePanelCtrl", () => {
  let curatePanel;
  let formHelpers;
  let $scope;
  let resourceHelpers;

  beforeEach(function () {
    ngMock.inject(($rootScope) => {
      $scope = $rootScope.$new();
    });

    formHelpers = {};
    resourceHelpers = {};

    curatePanel = new CuratePanelCtrl($scope, formHelpers, resourceHelpers);
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

    it('wires up the addNew button', () => {
      resourceHelpers.addNewChild = sinon.spy();
      curatePanel.addNew();
      expect(resourceHelpers.addNewChild).calledWith({id: '456'});
    });

    it("watches the form for changes", () => {
      formHelpers.checkForm = sinon.spy();
      $scope.$digest();
      expect(formHelpers.checkForm).calledWith('123', '456');
    });

  });
});
