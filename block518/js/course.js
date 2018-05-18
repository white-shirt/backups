/**
 * @author  [zk]
 * @param {number} index blocklyTreeRow
 */
var TreeRow = function (index) {
  this.TreeRowEles = $('.blocklyTreeRow').eq(index1);
  this.TreeRowWidth = this.TreeRowEles.width();
  this.TreeRowHeight = this.TreeRowEles.height();
  this.Position = function () {
    return { 'x': 0, 'y': this.TreeRowEles.offset().top };
  };
}

