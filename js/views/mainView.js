
var app = app || {};

app.AppView = Backbone.View.extend({
    el: '#container',

    /**
     * 	- Page init functionalities on each load
     * 	- Unbind events
     * 	- Empty the main container
     * 	- initialize counter
     * 	- Initialize collection
     */
    initialize: function(initialTiles) {
    	this.moveCount = 0;
    	this.$el.off('click', '.tileBackground');
    	this.$el.empty();
        this.collection = new app.Tiles(initialTiles);
        this.render();
        $("#counter").show(0).html("Moves : "+this.moveCount);
    },

    events:{
        'click .tileBackground':'matchTiles',
    },

    /**
     * 	- This function is called on click of tile
     * 	- checks for the previous phrase and current phrase
     * 	- if equal --> hide images on both tiles and show phrase and set flag true
     * 			   --> So that it will not have any effect on next iteration
     * 			   --> if no flag is false means game completed -- show dialog box	 
     * 	- if not equal --> hide images on both and show tile again 
     */
    matchTiles: function(e) {
    	var curView = this;
    	var phrase = $(".tileImg:visible").attr('alt');
    	var $this = $(e.target);
    	$this.hide(0).siblings(".tileImg").show(0);
    	var curPhrase = $this.siblings(".tileImg").attr('alt');
    	
    	if(phrase){
    		$("#disableDiv").show(0);
    		setTimeout(function(){
    			curView.moveCount++;
    			$("#counter").html("Moves : "+curView.moveCount);
    			
	    		if(phrase === curPhrase){
	    			$(".tileImg:visible").siblings(".tileBackground").attr('flag','true');
	    			$(".tileImg:visible").hide(0).siblings(".tilePhrase").show(0);
	    			
	    			// if game completed --> hide all and empty the container and show dialogBox
	    			if($(".tileBackground").filter('[flag="false"]').length === 0){
	    				curView.$el.empty();
	    				$("#header").hide(0);
	    				$("#counter").hide(0);
	    				$("#totalMoves").html(" (Total Moves : "+curView.moveCount+")");
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
    
    /**
     * 	- Render collection and append in current element
     * 	- Also add clearBoth div for parent height(clear floating)
     */
    render: function() {
        this.collection.each(function( item ) {
            this.renderTile( item );
        }, this );
        this.$el.append("<div style='clear:both'></div>");
    },

    /**
     * 	- Render Individual Tile view with current item
     */
    renderTile : function( item ) {
        var tileView = new app.TileView({
            model: item
        });
        this.$el.append( tileView.render().el );
    },
});