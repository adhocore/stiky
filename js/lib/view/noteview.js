define([
  'jquery',
  'underscore',
  'backbone',
  'note',
],

function (
  $,
  _,
  Backbone,
  Note
) {

  var NoteView = Backbone.View.extend({

    tagName:  'div',

    template: _.template($('#note-template').html()),

    events: {
      "blur .note-editable"   : "saveNote",
      "click .note-wrapper"   : "popMe",
      "blur .note-wrapper"    : "pushMe",
      "click .note-add"       : "newNote",
      "dblclick .note-remove"    : "removeNote",
      // "mousedown .note-move"  : "dragStart",
      // "mouseleave .note-move" : "dragStop",
    },

    initialize: function() {
      this.drag = false;
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.wrapper = this.$('.note-wrapper');
      this.input = this.$('.note-editable');

      return this;
    },

    popMe: function(e) {
      // Save the current zIndex and increase zIndex
      this.wrapper.data('zindex', this.wrapper.css('z-index'));
      this.wrapper.css('z-index', 2);
    },

    pushMe: function(e) {
      // Restore the saved zIndex
      this.wrapper.css('z-index', this.wrapper.data('zindex'));
    },

    newNote: function(e) {
      // Create a new NoteView, render it and append to the DOM
      $("#notes").append(new NoteView({model: new Note}).render().el);

      // If there are more than one Notes, activate remove handler
      if ($('.note-wrapper').length > 1) {
        $('.note-remove').show();
      }
    },

    saveNote: function(e) {
      this.model.save({
        text: this.input.html(),
        date: new Date().toLocaleString(),
        top: Math.round(this.wrapper.offset().top),
        left: Math.round(this.wrapper.offset().left),
      });
    },

    removeNote: function() {
      this.model.destroy();

      // If there is only one Note, disable remove handler
      if ($('.note-wrapper').length == 1) {
        $('.note-remove').hide();
      }
    },

    dragStart: function(e) {
      // Make it draggable, Mark that it is
      this.wrapper.attr('draggable', this.drag = true);
    },

    dragStop: function(e) {
      if (!this.drag) return;

      // Make it non draggable, Mark that it is
      this.wrapper.attr('draggable', this.drag = false);

      // Update model (i.e Note) and save
      this.model.set({left: e.clientX - 5, top: e.clientY - 255});
      this.saveNote();
    },

  });

  return NoteView;
});
