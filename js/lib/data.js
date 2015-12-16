define(function () {
  var _data = {};

  return {
    set: function (key, value) {
      _data[key] = value;

      return value;
    },
    get: function (key) {
      return _data[key];
    }
  };
});
