require.config({
  paths: {
    // From CDN
    jquery    : "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min",
    underscore: "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
    backbone  : "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min",
    localstore: "https://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.16/backbone.localStorage-min",

    // Our own
    data      : "lib/data",
    stikyapp  : "lib/stikyapp",
    note      : "lib/model/stikynote",
    notes     : "lib/collection/stikynotes",
    noteview  : "lib/view/noteview"
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
  $(function(){
    var app = new App;
  });
});
