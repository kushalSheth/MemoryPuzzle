
var app = app || {};

$(function() {
	
	appInit(); 
	
	// Attach click on dialogBox on page load
	$("#playAgain").click(function(){
		$(this).parent().hide(0);
		$("#header").show(0);
		appInit();
	});
});


/** function appInit() 
 * 		- Generates random tilNum 
 *  	- Get model from json by AJAX
 *  	- shuffle tiles so user gets different tiles each time
 *  	- call Main App with random tiles from json
 */
function appInit(){
	var tiles = [];
	var tilesNum = getRandomTileNum(6,12);
	
	$.ajax({
		url : 'js/ajax/words.json',
		dataType : 'json',
		success : function(response){
			var initTiles = response.data;
			shuffleTiles(initTiles).splice(tilesNum,(initTiles.length-tilesNum));
			tiles = initTiles.concat(initTiles); 
			tiles = shuffleTiles(tiles);
			new app.AppView(tiles);
		},
		error : function(){
			$("#errorMessage").html("Failed to load JSON!").show(0);
		}
	});
}

/** function getRandomTileNum()
 * 	
 * @param min - lower limit
 * @param max - upper limit
 * @returns - Random number based on upper and lower limit
 */
function getRandomTileNum (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** function shuffleTiles()
 * 		- Decides random numOfSwapes to be done on tiles
 * 		- And swap tiles depending on numOfSwapes
 * @param tiles - tiles to be displayed as array
 * @returns - shuffled tiles 
 */
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
