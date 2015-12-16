define([
  'jquery',
  'underscore',
  'backbone',
  'note',
  'data',
],
function (
  $,
  _,
  Backbone,
  Note,
  Data
) {

  var NoteView = Backbone.View.extend({

    tagName:  'div',

    template: _.template($('#note-template').html()),

    events: {
      "blur .note-editable"   : "saveNote",
      "click .note-wrapper"   : "popMe",
      "blur .note-wrapper"    : "pushMe",
      "click .note-add"       : "newNote",
      "click .note-remove"    : "removeNote",
      "mousedown .note-move"  : "dragStart",
      "mouseleave .note-move" : "dragStop",
    },

    initialize: function() {
      this.drag = false;
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      console.log(this.$el.html());
      this.wrapper = this.$('.note-wrapper');
      this.input = this.$('.note-editable');

      return this;
    },

    popMe: function(e) {
      this.wrapper.data('zindex', this.wrapper.css('z-index'));
      this.wrapper.css('z-index', 2);
    },

    pushMe: function(e) {
      this.wrapper.css('z-index', this.wrapper.data('zindex'));
    },

    newNote: function(e) {
      // this.saveNote(e);
      $("#notes").append(new NoteView({model: new Note}).render().el);
      if ($('.note-wrapper').length > 1) {
        $('.note-remove').show();
      }
    },

    saveNote: function(e) {
      var text = this.input.html();
      this.model.save({
        text: text,
        date: new Date().toLocaleString(),
        top: Math.round(this.wrapper.offset().top),
        left: Math.round(this.wrapper.offset().left),
      });
    },

    removeNote: function() {
      this.model.destroy();
      if ($('.note-wrapper').length == 1) {
        $('.note-remove').hide();
      }
    },

    dragStart: function(e) {
      this.wrapper.attr('draggable', this.drag = true);
    },

    dragStop: function(e) {
      if (!this.drag) return;

      this.wrapper.attr('draggable', this.drag = false);
      this.model.set({left: e.clientX - 5, top: e.clientY - 245});
      this.saveNote();
    },

  });

  return NoteView;
});
