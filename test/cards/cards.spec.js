import CardsCtrl from '../../src/scripts/cards/cards/cards.js';
import ngMock from 'angular-mocks-node';

describe("Cards", () => {
  let cards;
  let $scope;

  beforeEach(function () {
    ngMock.inject(function ($rootScope) {
      $scope = $rootScope.$new();
    });

    cards = new CardsCtrl($scope);
  });

  describe("collection changes",() => {
    it("should set the cards", () => {
      cards.collection = [1,2];
      $scope.$digest();
      expect(cards.collection).not.to.be.undefined;
    });
  });
});
