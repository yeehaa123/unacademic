import CuratePanelCtrl from '../../../src/scripts/sidebar/controllers/curate-panel.js';
import ngMock from 'angular-mocks-node';

describe.only("CuratePanelCtrl", () => {
  let curatePanel;
  let formHelpers;
  let $scope;

  beforeEach(function () {
    ngMock.inject(($rootScope) => {
      $scope = $rootScope.$new();
    });

    formHelpers = {};
    formHelpers.submit = sinon.spy();
    formHelpers.checkForm = sinon.spy();
    curatePanel = new CuratePanelCtrl($scope, formHelpers);
  });

  describe("initialize",() => {

    it('creates a new form', () => {
      expect(curatePanel.form).not.to.be.undefined;
    });

    it('sets its own template', () => {
      curatePanel.model = { constructor: { name: 'Course' }};
      let templateUrl = curatePanel.getTemplateUrl();
      expect(templateUrl).to.equal('./scripts/content/course/curatePanel.html');
    });
  });

  describe("actions",() => {

    beforeEach(() => {
      curatePanel.form = '123';
      curatePanel.model = {id: '456'};
    });

    it('wires up the submit button', () => {
      curatePanel.submit();
      expect(formHelpers.submit).calledWith('123', {id: '456'});
    });

    it("watches the form for changes", () => {
      $scope.$digest();
      expect(formHelpers.checkForm).calledWith('123', '456');
    });
  });
});
