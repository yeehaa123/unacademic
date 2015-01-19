(function(){
  describe("queue", function(){
    var queue = require('./queue.js');
    console.log(queue);

    beforeEach(function(){

    });

    describe("current user id", function(){

      it("is an empty array by default", function(){
        expect(queue.get().size).to.equal(0);
      });

      xdescribe("set", function(){
        var returnValue;

        describe("registering models", function(){
          describe("first one", function(){
            beforeEach(function(){
              returnValue = queue.set({register: 'object'});
            });

            it("returns an id", function(){
              expect(returnValue).to.equal('object_0');
            });

            it("increments the count", function(){
              returnValue = queue.set({register: 'object'});
              expect(returnValue).to.equal('object_1');
            });

          });
        })

        describe("adding models", function(){
          beforeEach(function(){
            returnValue = queue.set({add: 'object_123'});
          });

          it("should return true", function(){
            expect(returnValue).to.be.true;
          });

          it("should increase the count by one", function(){
            expect(queue.get().size).to.equal(1);
          });
        })

        describe("removing models", function(){
          beforeEach(function(){
            returnValue = queue.set({add: '123'});
            returnValue = queue.set({add: '453'});
            returnValue = queue.set({remove: '123'});
          });

          it("should return true", function(){
            expect(returnValue).to.be.true;
          });

          it("should increase the count by one", function(){
            expect(queue.get().size).to.equal(1);
          });
        });
      })
    })
  });
})();

