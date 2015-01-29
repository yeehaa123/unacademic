import Sidebar from '../../../src/scripts/sidebar/controllers/sidebar.js';

describe("Sidebar", () => {
  let sidebar;

  beforeEach(function () {
    sidebar = new Sidebar();
  });

  it("initialized",() => {
    expect(sidebar).not.to.be.undefined;
  });
});
