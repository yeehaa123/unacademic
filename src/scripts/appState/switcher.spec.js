var Switcher = require('./switcher.js');

describe("switcher", function(){
  var switcher;
  var $state;
  var $q;
  var promise;
  var response;

  beforeEach(function(){
    $state = {};
    $q = {}
    $q.when = sinon.stub()
    $state.go = sinon.stub();
    switcher = new Switcher($state, $q);
    promise = Promise.resolve('foo');
  });

  describe("state switching", function(){
    var state;

    describe("it has no name", function(){
      beforeEach(function(){
        state = {};
        $q.when.withArgs('no route change').returns(promise);
        response = switcher.set(state);
      });

      it("does not call $state", function(){
        expect($state.go).not.called;
      });


      it("returns the success message", function(){
        return expect(response).to.eventually.equal("foo");
      });
    });

    describe("it has a name", function(){
      beforeEach(function(){
        state = { name: 'waypoints.detail' };
        $state.go.withArgs(state.name, undefined).returns(promise);
        response = switcher.set(state);
      });

      it("does not call $q", function(){
        expect($q.when).not.called;
      });

      it("returns the success message", function(){
        return expect(response).to.eventually.equal("foo");
      });
    });
  })
});
