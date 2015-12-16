define([
  'jquery',
  'underscore',
  'backbone',
  'localstore',
  'note',
],

function(
  $,
  _,
  Backbone,
  LocalStorage,
  Note
) {

  var Notes = Backbone.Collection.extend({

    model: Note,

    localStorage: new LocalStorage('notes'),

  });

  return Notes;
});
