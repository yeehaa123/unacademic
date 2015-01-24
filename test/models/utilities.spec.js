import Utilities from '../../src/scripts/models/DataStore/utilities';

describe("Utilities", function(){
  var utilities;

  beforeEach(function(){

    let baseUrl = '';
    utilities = new Utilities(baseUrl);
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
    });
  });
});
