define([
  'jquery',
  'underscore',
  'backbone',
  'notes',
  'noteview'
],

function (
  $,
  _,
  Backbone,
  Notes,
  NoteView
) {

  // This is Main entrypoint to our app
  // Which in fact is a Backbone.View
  var Main = Backbone.View.extend({

    // The root DOM element for this app
    el: $("#stikyapp"),

    events: {},

    initialize: function(_Notes) {
      this.Notes = _Notes instanceof Notes ? _Notes : new Notes;

      // Register listeners
      this.listenTo(this.Notes, 'add', this.showNote);
      this.listenTo(this.Notes, 'all', this.render);

      this.Notes.fetch();
    },

    render: function() {
      // If there are no saved notes,
      // show empty box to start with
      if (!this.Notes.length && !$('.note-wrapper').length) {
        this.showNote(new this.Notes.model, this);
      }

      // Disable remove handler if there are not enough Notes
      if (this.Notes.length < 2) {
        $('.note-remove').hide();
      }

      return this;
    },

    showNote: function(note) {
      // Create a new NoteView, render it and append to the DOM
      $("#notes").append(new NoteView({model: note}).render().el);
    },

  });

  return Main;
});
