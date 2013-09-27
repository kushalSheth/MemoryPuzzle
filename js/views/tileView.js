
var app = app || {};

app.TileView = Backbone.View.extend({
    tagName: 'div',
    className: 'tileContainer',
    template: _.template($('#tileTemplate').html()),

    render: function() {
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }
});