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

  var Main = Backbone.View.extend({

    el: $("#stikyapp"),

    events: {},

    initialize: function(_Notes) {
      this.Notes = _Notes instanceof Notes ? _Notes : new Notes;
      this.listenTo(this.Notes, 'add', this.showNote);
      this.listenTo(this.Notes, 'all', this.render);
      this.Notes.fetch();
    },

    render: function() {
      if (!this.Notes.length && !$('.note-wrapper').length) {
        this.showNote(new this.Notes.model, this);
      }
      if (this.Notes.length < 2) {
        $('.note-remove').hide();
      }
      return this;
    },

    showNote: function(note) {
      $("#notes").append(new NoteView({model: note}).render().el);
    },

  });

  return Main;
});
