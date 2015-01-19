var Mutator = require('./mutator.js');

describe("mutator", function(){
  var mutator;
  var currentState;
  var history;
  var switcher;

  beforeEach(function(){
    currentState = {};
    switcher = {};
    history = {};

    currentState.set = sinon.spy();
    currentState.get = sinon.stub();
    history.add = sinon.spy();
    switcher.set = sinon.stub();

    mutator = new Mutator(currentState, switcher, history)
  });

  describe("set", function(){
    var changes;
    var value;

    beforeEach(function(){
      changes = {
        mode: 'learning',
      }
    });

    describe("successful mutations", function(){

      beforeEach(function(){
        changes = {
          mode: 'learning',
        }

        var promise = Promise.resolve(changes);
        currentState.get.returns(changes);
        switcher.set.returns(promise);
        value = mutator.set(changes);
      });

      it("sets the values", function(){
        expect(switcher.set).calledWith(changes);
      });

      it("sets the values", function(){
        return expect(value).to.eventually.deep.equal(changes);
      });

      it("calls the services", function(done){
        value.then(function(){
          expect(history.add).calledWith(changes);
          expect(currentState.set).calledWith(changes);
          done();
        });
      });
    });


    describe("failed mutations", function(){

      beforeEach(function(){
        switcher.set = sinon.stub().returns(Promise.reject());
        value = mutator.set();
      });

      it("does not returns an error message", function(){
        return expect(value).to.eventually.be.rejected;
        // return expect(value).to.eventually.be.rejectedWith(Error);
      });
    });

  });
});
