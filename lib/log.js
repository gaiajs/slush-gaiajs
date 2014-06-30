var gutil = require('gulp-util')

exports = module.exports = {
  info: function() {
    var args = Array.prototype.slice.call(arguments);
    gutil.log.apply(null, args);
  },
  error: function() {
    var args = Array.prototype.slice.call(arguments);
    args = args.map(function(item) { return gutil.colors.red(item)});
    gutil.log.apply(null, args);
  }
};
