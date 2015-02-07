import Utilities from '../../src/scripts/models/DataStore/utilities';

describe("Utilities", function(){
  var utilities;

  beforeEach(function(){

    let baseUrl = '';
    utilities = new Utilities(baseUrl);
  });

  describe.only("createUrl", function(){
    it("has no children", () => {

      let cover = {
        resourceName: 'cover',
        id: 'info',
        curator: 'yeehaa'
      };

      let createdUrl = utilities.createUrl(cover);
      let url = '/cover/yeehaa/info.json';
      expect(createdUrl).to.equal(url);
    });

    it("is a checkpoint", () => {

      let cover = {
        resourceName: 'checkpoint',
        waypoint: '123',
        id: '0',
        curator: 'yeehaa'
      };

      let createdUrl = utilities.createUrl(cover);
      let url = '/waypoint/yeehaa/123/0.json';
      expect(createdUrl).to.equal(url);
    });
  });

  describe("generateUrl", function(){

    describe("without userId", function(){
      it("creates a url", function(){
        var generatedUrl = utilities.generateUrl('CoverInfo');
        var url = '/coverInfo.json';
        expect(generatedUrl).to.equal(url);
      });
    });

    describe("with userId, without id", function(){
      it("creates a url", function(){
        var generatedUrl = utilities.generateUrl('CoverInfo', 'yeehaa123');
        var url = '/coverInfo/yeehaa123.json';
        expect(generatedUrl).to.equal(url);
      });
    });

    describe("with userId and id", function(){
      it("creates a url", function(){
        var generatedUrl = utilities.generateUrl('Path', 'yeehaa123', '456');
        var url = '/path/yeehaa123/456.json';
        expect(generatedUrl).to.equal(url);
      });

      it("converts 0 to a string", function(){
        var generatedUrl = utilities.generateUrl('Path', 'yeehaa123', 0);
        var url = '/path/yeehaa123/0.json';
        expect(generatedUrl).to.equal(url);
      });
    });
  });
});
