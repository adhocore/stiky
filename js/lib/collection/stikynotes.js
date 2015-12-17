define([
  'jquery',
  'underscore',
  'backbone',
  'note',
],

function(
  $,
  _,
  Backbone,
  Note
) {

  var Notes = Backbone.Collection.extend({

    model: Note,

    // Instantiate Note rather than LocalStorage
    localStorage: new Note().localStorage,

  });

  return Notes;
});
