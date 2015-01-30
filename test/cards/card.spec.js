import CardCtrl from '../../src/scripts/cards/card/card.js';
import ngMock from 'angular-mocks-node';

describe("Card", () => {
  let card;
  let $scope;
  let dispatcher;
  let model;

  beforeEach(function () {
    let cardFn;
    dispatcher = {};

    dispatcher.setState = sinon.spy();

    ngMock.inject(function ($rootScope, $controller) {
      $scope = $rootScope.$new();
      cardFn = $controller(CardCtrl, { 
        $scope: $scope, 
        dispatcher: dispatcher 
      }, true);
    });

    model = {
      resourceName: 'course',
      curator: 'yeehaa',
      title: 'Learn Angular',
      id: '123'
    }

    model.constructor = sinon.stub();
    
    cardFn.instance.model = model;
    card = cardFn(dispatcher);
  });

  describe("initialize",() => {

    it("should set the props correctly", () => {
      expect(card.model.title).to.equal('Learn Angular');
    });

  });

  describe("learn", () => {
    let promise;
    let clone;

    beforeEach(() => {
      clone = {};
      promise = Promise.resolve({ data: { id: model.id, curator: model.curator }});

      clone.save = sinon.stub().returns(promise);
      model.constructor.returns(clone);

      card.learn();
    });

    it("should clone the resource", () => {
      expect(model.constructor).calledWith(model);
    });

    it("should save the clone", () => {
      expect(clone.save).called;
    });

    it("should save the clone", (done) => {
      let name = model.resourceName;
      let curator = model.curator;
      let id = model.id;

      promise.then(() => {
        let view = { name, curator, [name]: id }
        expect(dispatcher.setState).calledWith({view});;
        done();
      });
    });
  });

  describe("browse", () => {
    it("should call dispatcher", () => {
      let curator = model.curator;
      let id = model.id;
      let name = model.resourceName;

      card.browse();
      let view = { name, [name]: '123', curator }; 
      expect(dispatcher.setState).calledWith({view});
    });
  });
});
