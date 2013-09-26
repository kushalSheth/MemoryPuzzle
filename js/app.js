
var app = app || {};

$(function() {
	appInit();
	
	$("#playAgain").click(function(){
		$(this).parent().hide(0);
		$("#header").show(0);
		appInit();
	});
});

function appInit(){
	var tiles = [];
	var tilesNum = getRandomTileNum(2,4);
	
	$.ajax({
		url : 'js/ajax/words.json',
		dataType : 'json',
		success : function(response){
			shuffleTiles(response.data).splice(tilesNum);
			tiles = response.data.concat(response.data); 
			tiles = shuffleTiles(tiles);
			alert(tiles.length);
			new app.AppView(tiles);
		},
		error : function(){
			$("#errorMessage").html("Failed to load JSON!").show(0);
		}
	});
}

function getRandomTileNum (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleTiles(tiles){
	var noOfSwaps = getRandomTileNum((tiles.length/3), tiles.length);
	var i1=0;
	var i2=0;
	for(var i=0;i<noOfSwaps;i++){
		i1= getRandomTileNum(0, tiles.length-1);
		i2 = getRandomTileNum(0, tiles.length-1);
		var temp = tiles[i1];
		tiles[i1] = tiles[i2];
		tiles[i2] = temp;
	}
	return tiles;
}