import Resource from '../../../src/scripts/appState/currentState/resource';

describe("resource", () => {
  let resource;

  beforeEach(() => {
    resource = new Resource();
  });

  describe("resource", () => {

    it("is undefined by default", () => {
      expect(resource.get()).to.be.undefined;
    });


    describe("set", () => {
      let newResource;
      let setName;

      beforeEach(() => {
        newResource = {
          id: '123',
          curator: 'yeehaa'
        }
        setName = resource.set(newResource);
      });


      it("returns true", () => {
        expect(setName).to.be.true;
      });

      it("can be set", () => {
        expect(resource.get()).to.equal(newResource);
      });
    })
  })
});
