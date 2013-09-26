
var app = app || {};

app.AppView = Backbone.View.extend({
    el: '#container',

    initialize: function(initialTiles) {
    	this.$el.off('click', '.tileBackground');
    	this.$el.empty();
        this.collection = new app.Tiles(initialTiles);
        this.render();
    },

    events:{
        'click .tileBackground':'matchTiles',
    },

    matchTiles: function(e) {
    	var $this = $(e.target);
    	var phrase = $(".tileImg:visible").attr('alt');
    	$this.hide(0).parent().children(".tileImg").show(0);
    	var curPhrase = $this.parent().children(".tileImg").attr('alt');
    	
    	if(phrase){
    		$("#disableDiv").show(0);
    		setTimeout(function(){
	    		if(phrase === curPhrase){
	    			$(".tileImg:visible").parent().children(".tileBackground").attr('flag','true');
	    			$(".tileImg:visible").hide(0).parent().children(".tilePhrase").show(0);
	    			if($(".tileBackground").filter('[flag="false"]').length == 0){
	    				new app.AppView([]);
	    				$("#header").hide(0);
	    				$(".completeMsg").show(0);	
	    			}else{
	    				$("#messageDiv").html("Removed matching Tiles!").show(0).delay(1000).hide(0);
	    			}
	    		}else{
	    			$(".tileImg:visible").hide(0);
	    			$(".tileBackground").filter('[flag="false"]').show(0);
	    			$("#messageDiv").html("No matching Tiles!").show(0).delay(1000).hide(0);
	    		}
	    		$("#disableDiv").hide(0);
	    	},1000);
    	}
    	
    },
    
    render: function() {
        this.collection.each(function( item ) {
            this.renderTile( item );
        }, this );
        this.$el.append("<div style='clear:both'></div>");
    },

    renderTile : function( item ) {
        var tileView = new app.TileView({
            model: item
        });
        this.$el.append( tileView.render().el );
    },
});