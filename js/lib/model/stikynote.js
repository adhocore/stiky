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

      return {
        text: '',
        date: new Date().toLocaleString(),
        top: Math.round(Math.random() * (window.innerHeight - 255)),
        left: Math.round(Math.random() * (window.innerWidth - 205)),
      };

    },

    localStorage: new LocalStorage('notes'),

  });

  return Note;
});
