var d3 = require("d3");
module.exports = function destroy_viz() {
  d3.select(this.params.base_container).selectAll("div").remove();

  this.regl.destroy();

  // remove tooltip
  d3.select(this.params.tooltip_id).remove();
};
