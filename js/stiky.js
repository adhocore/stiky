// Configure module paths for require
require.config({
  paths: {
    // From Vendors
    jquery    : 'vendor/jquery.min',
    underscore: 'vendor/underscore.min',
    backbone  : 'vendor/backbone.min',
    localstore: 'vendor/backbone.localstorage.min',

    // Our own
    data      : 'lib/data',
    stikyapp  : 'lib/stikyapp',
    note      : 'lib/model/stikynote',
    notes     : 'lib/collection/stikynotes',
    noteview  : 'lib/view/noteview'
  }
});

require([
  'jquery',
  'stikyapp',
],

function (
  $,
  App
) {
  // Boot the app on DOM ready
  $(function(){
    var app = new App;
  });
});
