define([
  'jquery',
  'underscore',
  'backbone',
  'localstore',
],

function(
  $,
  _,
  Backbone,
  LocalStorage
) {

  var Note = Backbone.Model.extend({

    // Defaults donot have `id` key,
    // that will be managed by storage engine
    defaults: function() {
      var total  = $('.note-wrapper').length;
      var perRow = Math.floor($(document).width() / 230);
      var top    = Math.floor(total / perRow) * 285;
      var left   = Math.floor(total % perRow) * 230;

      return {
        text: '',
        date: new Date().toLocaleString(),
        top: top,
        left: left,
      };

    },

    localStorage: new LocalStorage('notes'),

  });

  return Note;
});
