
var app = app || {};

app.AppView = Backbone.View.extend({
    el: '#container',

    initialize: function(initialTiles) {
        this.collection = new app.Tiles(initialTiles);
        this.render();
    },

    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderTile( item );
        }, this );
    },

    renderTile : function( item ) {
        var tileView = new app.TileView({
            model: item
        });
        this.$el.append( tileView.render().el );
    }
});