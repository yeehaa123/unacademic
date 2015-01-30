import BC from '../../src/scripts/models/baseClass/index';
import _ from 'lodash';
import ngMock from 'angular-mocks-node';

describe("BaseClass", () => {
  let BaseClass;
  let DataStore;
  let dispatcher;
  let $q;
  let $rootScope;

  beforeEach(() => {

    ngMock.inject((_$rootScope_, _$q_) => {
      $rootScope = _$rootScope_;
      $q = _$q_;
    });

    DataStore = {};
    DataStore.get = sinon.stub();
    DataStore.save = sinon.spy();

    dispatcher = {};
    let utilities = {};

    utilities.generateUID = sinon.spy();
    dispatcher.getState = sinon.stub().returns({user: 'yeehaa'});

    BaseClass = new BC($q, DataStore, utilities, dispatcher);
    BaseClass.initialize(initialize());
  });

  describe("general", () => {

    let instance;

    beforeEach(() => {
      instance = new BaseClass();
    });

    it("knows it's name", () => {
      expect(instance.resourceName).to.equal('baseclass');
    });

    it("keeps its private info to itself", () => {
      expect(_.keys(instance)).not.to.contain('resourceName');
    });

    it("sets its properties from the schema", () => {
      expect(_.keys(instance)).to.contain('id');
    });
  });

  describe("get", () => {
    let response;

    beforeEach(() => {});

    describe("a single item", () => {
      beforeEach(() => {
        let promise = $q.when({title: 'Mock Title'});
        let args = ['BaseClass', 'general', '123'];

        DataStore.get.withArgs(...args).returns(promise);
        BaseClass.get('general', '123').then((data) => { response = data });
        $rootScope.$apply();
      });

      it("returns an instance of BaseClass", () => {
        expect(response).to.be.an.instanceOf(BaseClass);
      });

      it("gets the info", () => {
        expect(response.title).to.equal('Mock Title');
      });
    });

    describe("a collection", () => {
      beforeEach(() => {
        let promise = $q.when([{title: 'Mock Title'}]);
        let args = ['BaseClass', 'general', ['123']];

        DataStore.get.withArgs(...args).returns(promise);
        BaseClass.get('general', ['123']).then((data) => { response = data });
        $rootScope.$apply();
      });

      it("returns an instance of BaseClass", () => {
        expect(response[0]).to.be.an.instanceOf(BaseClass);
      });

      it("gets the info", () => {
        expect(response[0].title).to.equal('Mock Title');
      });
    });
  });

  describe("getAll", () => {
    let response;

    describe("without userId", () => {
      beforeEach(() => {
        let data = {
          "yeehaa": { "123": { curator: 'yeehaa' } },
          "marijn": { "456": { curator: 'marijn' } ,
                      "123": { curator: 'marijn', clonedFrom: 'yeehaa' } }
        };
        let promise = $q.when(data);

        DataStore.get.withArgs('BaseClass').returns(promise);
        BaseClass.getAll().then((data) => { 
          response = data 
        });
        $rootScope.$apply();
      });

      it("returns an array of objects", () => {
        expect(response.length).to.equal(2);
      });

      it("returns an instance of CoverInfo", () => {
        expect(response[0]).to.be.an.instanceOf(BaseClass);
      });

      it("gets the info", () => {
        expect(response[0].curator).to.equal('yeehaa');
      });
    });

    describe("with userId", () => {
      beforeEach(() => {
        let data = { "123": { curator: 'yeehaa'} };
        let promise = $q.when(data);

        DataStore.get.withArgs('BaseClass', 'yeehaa').returns(promise);
        BaseClass.getAll('yeehaa').then((data) => { response = data });
        $rootScope.$apply();
      });

      it("returns an array of objects", () => {
        expect(response.length).to.equal(1);
      });

      it("returns an instance of CoverInfo", () => {
        expect(response[0]).to.be.an.instanceOf(BaseClass);
      });

      it("gets the info", () => {
        expect(response[0].curator).to.equal('yeehaa');
      });
    });
  });


  describe("save", () => {
    let instanceWithCurator;
    let instance;

    beforeEach(() => {
      let promise = $q.when();
      instanceWithCurator = new BaseClass({title: 'Mock Title', id: '123', curator: 'yeehaa'});
    });

    afterEach(() => {
      $rootScope.$apply();
    });

    it("calls the dispatcher to get the curator", () => {
      instance = new BaseClass({title: 'Mock Title'});
      instance.save();
      expect(dispatcher.getState).to.be.called;
    });

    it("calls the datastore if required fields are missing", () => {
      instance = new BaseClass({});
      instance.save();
      expect(DataStore.save).not.called;
    });

    it("calls the datastore to save the model", () => {
      instance = new BaseClass({title: 'Mock Title', id: '123'});
      instance.save();
      expect(DataStore.save).calledWith(instanceWithCurator);
    });
  });

  describe("clone", () => {
    let clone;
    let response;
    let promise;
    let spy;
    let instance;

    beforeEach(() => {
      instance = new BaseClass({ id: '123', curator: 'marijn' });

      let promises = [$q.when(1), $q.when(2)];

      BaseClass.prototype.save = sinon.stub()
      BaseClass.prototype.save
        .onCall(0).returns(promises[0])
        .onCall(1).returns(promises[1]);

      response = BaseClass.clone(instance);
      spy = BaseClass.prototype.save;
    });

    it("keeps the original's id", () => {
      expect(spy.thisValues[0].id).to.equal('123');
    });

    it("sets the new curator to current user", () => {
      expect(dispatcher.getState).called;
      expect(spy.thisValues[0].curator).to.equal('yeehaa');
    });

    it("stores the original's curator name on the clone", () => {
      expect(spy.thisValues[0].clonedFrom).to.equal('marijn');
    });

    it("stores the clone's curator name on the original", () => {
      expect(instance.clones).to.include('yeehaa');
    });

    it("saves the original", () => {
      expect(spy.thisValues[1]).to.equal(instance);
    });

    it("returns the clone", (done) => {
      response.then((data) => {
        expect(data).to.be.instanceof(BaseClass);
        done();
      });
      $rootScope.$apply();
    });
  });
});


function initialize(){
  return {
    schema: {
      properties: {
        id: {
          required: true
        },
        clonedFrom: {},
        title: {
          required: true
        },
        curator: {
          required: true
        }
      }
    },
    initData: {
      title: 'UnAcademic'
    }
  }
}
