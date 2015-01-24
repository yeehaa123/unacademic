import Queue from '../../src/scripts/appState/queue';

describe("queue", () => {
  let queue;

  beforeEach(() => {
    queue = new Queue();
  });

  describe("current user id", () => {

    it("is an empty array by default", () => {
      expect(queue.get().size).to.equal(0);
    });

    describe("set", () => {
      let returnValue;

      describe("registering models", () => {
        describe("first one", () => {
          beforeEach(() => {
            returnValue = queue.set({register: 'object'});
          });

          it("returns an id", () => {
            expect(returnValue).to.equal('object_0');
          });

          it("increments the count", () => {
            returnValue = queue.set({register: 'object'});
            expect(returnValue).to.equal('object_1');
          });

        });
      })

      describe("adding models", () => {
        beforeEach(() => {
          returnValue = queue.set({add: 'object_123'});
        });

        it("should return true", () => {
          expect(returnValue).to.be.true;
        });

        it("should increase the count by one", () => {
          expect(queue.get().size).to.equal(1);
        });
      })

      describe("removing models", () => {
        beforeEach(() => {
          returnValue = queue.set({add: '123'});
          returnValue = queue.set({add: '453'});
          returnValue = queue.set({remove: '123'});
        });

        it("should return true", () => {
          expect(returnValue).to.be.true;
        });

        it("should increase the count by one", () => {
          expect(queue.get().size).to.equal(1);
        });
      });
    })
  })
});
