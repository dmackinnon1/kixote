
//Classes for generating knight tours, and kings tours
/*
* A Cell is a square on the chessboard.
*/

var CellType = "";

class Cell {
		
	constructor(rowNum, colNum, board) {
		this.rowNum = rowNum;
		this.colNum = colNum;
		this.board = board;
		this.decoration = "*";
		this.hide = false;
	}

	copy() {
		var copy = new Cell(this.rowNum, this.colNum, this.board);
		copy.decoration = this.decoration;
		copy.hide = this.hide;
		return copy;
	}
	
	hideIt() {
		this.hide = true;
	}
	
	showIt(){
		this.hide = false;
	}
	
	getDisplay() {
		if(this.hide) {
			var glyph = "<span class='glyphicon glyphicon-question-sign'";
			glyph += " data-row='"+ this.rowNum + "' data-col='" + this.colNum + "'>";
			return glyph;
		} else {
			return this.decoration;
		}
	}
	
	neighbor(i,j) {
		if ((this.rowNum + i < this.board.getRowSize())
			&&(this.rowNum + i >= 0)
			&&(this.colNum + j < this.board.getColumnSize())
			&&(this.colNum + j >= 0)){
			return this.board.cells[this.rowNum + i][this.colNum + j];
		}
		return null;
	}
	
	nne(){
		return this.neighbor(2,1);
	}
	
	nnw(){
		return this.neighbor(2,-1);
	}
	
	ene(){
		return this.neighbor(1,2);		
	}
	
	wnw(){
		return this.neighbor(1,-2);
	}
	
	sse(){
		return this.neighbor(-2,1);
	}
	
	ese(){
		return this.neighbor(-1,2);
	}
	
	ssw(){
		return this.neighbor(-2,-1)
	}
	
	wsw(){
		return this.neighbor(-1,-2);
	}
	
	north(){
		return this.neighbor(1,0);
	}
	
	south(){
		return this.neighbor(-1,0);
	}
	
	east(){
		return this.neighbor(0,1);		
	}
	
	west(){
		return this.neighbor(0,-1);
	}
	
	northEast(){
		return this.neighbor(1,1);
	}
	
	northWest(){
		return this.neighbor(1,-1);
	}
	
	southEast(){
		return this.neighbor(-1,1)
	}
	
	southWest(){
		return this.neighbor(-1,-1);
	}
	
	neighbors(){
		if (CellType == "knight"){
			return this.knightNeighbors();
		} else if (CellType == "king") {
			return this.kingNeighbors();
		} else if (CellType == "numbrix"){
			return this.neumannNeighbors();
		} else if (CellType == "complete") {
			return this.completeNeighbors();
		} else if (CellType == "queen") {
			return this.queenNeighbors();
		} else if (CellType == "rook") {
			return this.rookNeighbors();
		} else if (CellType == "bishop") {
			return this.bishopNeighbors();
		}
	}

	completeNeighbors() {
		return this.board.allBut(this.rowNum, this.colNum);
	}

	neumannNeighbors(){
		var list = [];
		if(this.north() != null) list.push(this.north());
		if(this.south() != null) list.push(this.south());
		if(this.east() != null) list.push(this.east());
		if(this.west() != null) list.push(this.west());
		return list;
	}

	kingNeighbors() {
		var list = [];
		if(this.north() != null) list.push(this.north());
		if(this.south() != null) list.push(this.south());
		if(this.east() != null) list.push(this.east());
		if(this.west() != null) list.push(this.west());
		
		if(this.northEast() != null) list.push(this.northEast());
		if(this.northWest() != null) list.push(this.northWest());
		if(this.southEast() != null) list.push(this.southEast());
		if(this.southWest() != null) list.push(this.southWest());				
		return list;
	}

	knightNeighbors() {
		var list = [];
		if(this.ese() != null) list.push(this.ese());
		if(this.sse() != null) list.push(this.sse());
		if(this.wsw() != null) list.push(this.wsw());
		if(this.ssw() != null) list.push(this.ssw());
		
		if(this.ene() != null) list.push(this.ene());
		if(this.nne() != null) list.push(this.nne());
		if(this.wnw() != null) list.push(this.wnw());
		if(this.nnw() != null) list.push(this.nnw());
		return list;
	}

	queenNeighbors() {
		var queen = this.rookNeighbors();
		Array.prototype.push.apply(queen, this.bishopNeighbors());
		return queen;
	}

	rookNeighbors(){
		var rook = this.column();
		Array.prototype.push.apply(rook, this.row());
		return rook;
	}

	bishopNeighbors(){
		var bish = this.upDiagonal();
		Array.prototype.push.apply(bish, this.downDiagonal());
		return bish;
	}

	row(){
		var row = [];
		for (var i = 0; i < this.board.rowNum; i++) {
			if (i !== this.colNum) row.push(this.board.cells[this.rowNum][i]);	
		}
		return row;
	}

	column(){
		var col = [];
		for (var i = 0; i < this.board.colNum; i++) {
			if (i !== this.rowNum) col.push(this.board.cells[i][this.colNum]);	
		}
		return col;
	}

	downDiagonal(){
		var diag = [];
		var i = this.rowNum +1; 
		var j = this.colNum +1;
		while( i< this.board.rowNum && j<this.board.colNum){
			diag.push(this.board.cells[i][j]);
			i++;
			j++;
		}

		i = this.rowNum -1; 
		j = this.colNum -1;
		while( i >= 0 && j >= 0){
			diag.push(this.board.cells[i][j]);
			i--;
			j--;
		}
		return diag;
	}

	upDiagonal(){
		var diag = [];
		var i = this.rowNum -1; 
		var j = this.colNum +1;
		while( i >= 0 && j<this.board.colNum){
			diag.push(this.board.cells[i][j]);
			i--;
			j++;
		}

		i = this.rowNum +1; 
		j = this.colNum -1;
		while( i < this.board.rowNum && j >= 0){
			diag.push(this.board.cells[i][j]);
			i++;
			j--;
		}
		return diag;
	}
	
	isNeighbor(cell) {
		var nbrs = this.neighbors();
		for (var i = 0; i < nbrs.length; i ++) {
			if (cell.isEqual(nbrs[i])) return true;
		}
		return false;
	}
	
	isLeastNeighborOffPath(cell, path) {
		if (! this.isNeighbor(cell)) return false;
		let l = 100; //absurdly high number :)
		let n = cell.neighbors().filter(x => !path.contains(x));
		for (let c in n){
			let t = parseInt(n[c].decoration);
			if (t <= l) l = t;
		}
		return parseInt(this.decoration) === l;
	}
	
	degree(){
		return this.neighbors().length;
	}
	
	toString() {
		return "(" + this.rowNum + "," + this.colNum +")";
	}
	
	isEqual(other) {
		var result =(this.rowNum === other.rowNum) && (this.colNum === other.colNum);
		return result;
	}
};

/*
* A chessboard of configurable size.
*/
class Board {

	constructor(rowNum, colNum) {
		this.rowNum = rowNum;
		this.colNum = colNum;
		this.cells = [];
	}
	
	init() {
		for (var i = 0; i < this.rowNum; i ++) {
			this.cells[i] = [];
			for (var j = 0; j < this.colNum; j ++){
				this.cells[i].push (new Cell(i, j, this));
			}
		}
	}

	allBut(a,b) {
		var allButIJ = [];
		for (var i = 0; i < this.rowNum; i ++) {
			for (var j = 0; j < this.colNum; j ++){
				if (a != i && b !=j) {
					allButIJ.push(this.cells[i][j]);
				}
			}
		}
		return allButIJ;
	}
	
	randomStart() {
		var i = randomInt(this.rowNum);
		var j = randomInt(this.colNum);
		return this.cells[i][j];
	}
	
	toString () {
		var result = "";
		for (var i = 0; i < this.rowNum; i ++){
			result += this.cells[i];
		}
		return result;
	}
	getRowSize() {
		return this.rowNum;
	}
	getColumnSize(){
		return this.colNum;
	}
	getSize() {
		return this.colNum * this.rowNum;
	}
};


/*
* A path through the chessboard.
*/
class Path {
	
	constructor(board, start) {
		this.board = board;
		this.start = start;
		this.cells = [];
	}
	
	clear() {
		this.cells = [];
	}

	size(){
		return this.cells.length;
	}
	
	contains(cell) {
		for(var i = 0; i < this.cells.length; i++){ 
			if (this.cells[i].isEqual(cell)){ 
				return true;
			}
		}
		return false;
	}
	
	add(cell) {
		this.cells.push(cell);
	}
	
	freeDegree(cell){
		var freeDegree  = 0;
		var nlist = cell.neighbors();
		for(var i = 0; i < nlist.length; i++){
			var c = nlist[i]; 
			if(!this.contains(c)) freeDegree ++;	
		}
		return freeDegree;
	}
	
	initPath() {
		var tries = 0;
		while (!this.isTour() && tries < 10) {
			this.clear();
			if(tries > 0) {
			}
			this.warnsdorffPath();
			tries ++;
		}
		return this.isTour();
	}

	mostNeighbors() {
		if (CellType == "knight") {
			return 8;
		} else if (CellType == "king"){
			return 9;
		} else if (CellType == "numbrix") {
			return 4;
		} else if (CellType == "complete") {
			return 63;
		}
	}

	warnsdorffPath(){
		var currentCell = this.start;
		this.add(currentCell);
		var boardSize = this.board.getSize();
		var options = [];
		var leasts = [];
		var currentValue = null;
		while(this.size() < boardSize){
			var leastValue = this.mostNeighbors();
			options = currentCell.neighbors();
			leasts = [];
			//first loop to find the least
			for(var i = 0; i < options.length; i++){
				var c = options[i];
				if(this.contains(c)) continue;
				currentValue = this.freeDegree(c);
				if(currentValue <= leastValue){
					leastValue = currentValue; 
				}
			}
			//second loop to gather all with least value
			for(var i = 0; i < options.length; i++){
				var c = options[i];
				if(this.contains(c)) continue;
				currentValue = this.freeDegree(c);
				if(currentValue == leastValue){
					leasts.push(c);
				}
			}
			if (leasts.length == 0) break;
			var toPick = randomInt(leasts.length);
			currentCell = leasts[toPick];
			this.add(currentCell);
		}	
	}	
	
	decorateCells() {
		for (var i = 0; i < this.cells.length; i ++) {
			this.cells[i].decoration = (i+1);
		}
	}
	
	head() {
		return this.cells[0];
	}
	tail() {
		return this.cells[this.cells.length -1];
	}
	
	toString() {
		return "Path: " + this.cells;
	}
	
	isTour(){
		return this.cells.length === this.board.getSize();
	}
	
	isClosed(){
		return this.head().isNeighbor(this.tail());		
	}
};

/**
* display 
*/

function htmlForBoard(board) {
	var html = "<table border = 1 cellspacing = 1 cellpadding = 1 align='center'>";
	for (var i = 0; i < board.cells.length; i++){
		var row = board.cells[i];
		html += "<tr>";
		for (var j = 0; j < row.length; j ++) {
			var c = row[j];
			html += "<td><div id='cell" + i +""+ j +"' class='gameCell' onclick='cellClick(event)'";
			html += " data-row='"+ i + "' data-col='" + j + "'>";
			html += c.getDisplay() + "</div></td>";
		}
		html += "</tr>";
	}
	html += "</table>";
	return html;	
};

function cellClick(event) {
	var i = parseInt(event.target.getAttribute("data-row"));
	var j = parseInt(event.target.getAttribute("data-col"));
	game.clicked(i,j, event.target); //event.target
};

function getDiv(i,j) {
	return $("#cell" + i +""+j);
};
	

//object containing displayable elements
var gameDisplay = {};
gameDisplay.statusMessage = "";
gameDisplay.map = "";
gameDisplay.missteps = "";
gameDisplay.backtracks = "";

/**
* Some events are fired when these elements are updated
* refreshStatus - called when status is updated
* refreshMap - called when map is updated
* refreshSteps - called when misstep count is updated
* 
* These use the 'evnts' object to invoke any registered callbacks
*/

/**
* utilities
*/
function randomInt(lessThan){
	var selection = Math.floor(Math.random()*(lessThan));
	return selection;
};


function svgMap(path, size=8) {
	var svg = new Bldr("svg");
	let width = size*30;
	svg.att("align", "center").att("width",width).att("height",width);
	svg.att("style","display:block");
	//first the board
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j ++) {
			var x = i*30;
			var y = j*30;
			if (i%2==0 && j%2==0){
				var rect = new Bldr("rect").att("x", x).att("y",y);
				rect.att("width", "30").att("height","30").att("fill", "#ccccb3"); 			
				svg.elem(rect);
			}
			if (i%2!=0 && j%2!=0){
				var rect = new Bldr("rect").att("x", x).att("y",y);
				rect.att("width", "30").att("height","30").att("fill", "#ccccb3"); 			
				svg.elem(rect);
			}
		}
	}
	//now the path
	var prev = null;
	for (var i=0; i< path.length; i++) {
		var cell = path[i];
		var x = (15 + cell.colNum*30);
		var y = (15 + cell.rowNum*30);
		if (prev !== null) {
			var px = (15 + prev.colNum*30);
			var py = (15 + prev.rowNum*30);
			var line = new Bldr("line").att("x1", px).att("y1", py).att("x2", x).att("y2",y);
			line.att("stroke", "black").att("stroke-width", 2);
			svg.elem(line);
		}
		prev = cell;
	}
	//finally, the dots
	for (var i=0; i< path.length; i++) {
		var cell = path[i];
		var x = (15 + cell.colNum*30);
		var y = (15 + cell.rowNum*30);
		var circle = new Bldr("circle").att("cx",x).att("cy", y);
		circle.att("r",3).att("stroke", "black").att("stroke-width",1).att("fill","grey");
		svg.elem(circle);
		if (i === 0){
			var c0 = new Bldr("circle").att("cx",x).att("cy", y);
			c0.att("r",6).att("stroke", "black").att("stroke-width",1).att("fill","none");
			svg.elem(c0);	
		} else if (i === path.length - 1) {
			var cn = new Bldr("circle").att("cx",x).att("cy", y);
			cn.att("r",5).att("stroke", "black").att("stroke-width",1).att("fill","black");
			svg.elem(cn);
		}			
	}
	return svg.build();
};

function svgMapSmall(path) {
	var svg = new Bldr("svg");
	svg.att("width","160").att("height","160");
	//first the board
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j ++) {
			var x = i*20;
			var y = j*20;
			if (i%2==0 && j%2==0){
				var rect = new Bldr("rect").att("x", x).att("y",y);
				rect.att("width", "20").att("height","20").att("fill", "#ccccb3"); 			
				svg.elem(rect);
			}
			if (i%2!=0 && j%2!=0){
				var rect = new Bldr("rect").att("x", x).att("y",y);
				rect.att("width", "20").att("height","20").att("fill", "#ccccb3"); 			
				svg.elem(rect);
			}
		}
	}
	//now the path
	var prev = null;
	for (var i=0; i< path.length; i++) {
		var cell = path[i];
		var x = (10 + cell.colNum*20);
		var y = (10 + cell.rowNum*20);
		if (prev !== null) {
			var px = (10 + prev.colNum*20);
			var py = (10 + prev.rowNum*20);
			var line = new Bldr("line").att("x1", px).att("y1", py).att("x2", x).att("y2",y);
			line.att("stroke", "black").att("stroke-width", 2);
			svg.elem(line);
		}
		prev = cell;
	}
	//finally, the dots
	for (var i=0; i< path.length; i++) {
		var cell = path[i];
		var x = (10 + cell.colNum*20);
		var y = (10 + cell.rowNum*20);
		var circle = new Bldr("circle").att("cx",x).att("cy", y);
		circle.att("r",3).att("stroke", "black").att("stroke-width",1).att("fill","grey");
		svg.elem(circle);
		if (i === 0){
			var c0 = new Bldr("circle").att("cx",x).att("cy", y);
			c0.att("r",6).att("stroke", "black").att("stroke-width",1).att("fill","none");
			svg.elem(c0);	
		} else if (i === path.length - 1) {
			var cn = new Bldr("circle").att("cx",x).att("cy", y);
			cn.att("r",5).att("stroke", "black").att("stroke-width",1).att("fill","black");
			svg.elem(cn);
		}			
	}
	return svg.build();
};


function knightGlyph(i,j){
	var glyph = "<span class='glyphicon glyphicon-knight' ";
	glyph += " data-row='"+ i + "' data-col='" + j + "'>";
	return glyph;	
};

function kingGlyph(i,j){
	var glyph = "<span class='glyphicon glyphicon-king' ";
	glyph += " data-row='"+ i + "' data-col='" + j + "'>";
	return glyph;	
};

function queenGlyph(i,j){
	var glyph = "<span class='glyphicon glyphicon-queen' ";
	glyph += " data-row='"+ i + "' data-col='" + j + "'>";
	return glyph;	
};

function rookGlyph(i,j){
	var glyph = "<span class='glyphicon glyphicon-tower' ";
	glyph += " data-row='"+ i + "' data-col='" + j + "'>";
	return glyph;	
};

function bishopGlyph(i,j){
	var glyph = "<span class='glyphicon glyphicon-bishop' ";
	glyph += " data-row='"+ i + "' data-col='" + j + "'>";
	return glyph;	
};

function checkGlyph(i,j){
	var glyph = "<span class='glyphicon glyphicon-check' ";
	glyph += " data-row='"+ i + "' data-col='" + j + "'>";
	return glyph;		
};

function cellTypeGlyph(i,j) {
	if (CellType == "knight"){
			return knightGlyph(i,j);
		} else if (CellType == "king") {
			return kingGlyph(i,j);
		} else if (CellType == "numbrix"){
			return questionGlyph(i,j); //replace this
		} else if (CellType == "complete") {
			return questionGlyph(i,j); //replace this
		} else if (CellType == "queen") {
			return queenGlyph(i,j);
		} else if (CellType == "rook") {
			return rookGlyph(i,j);
		} else if (CellType == "bishop") {
			return bishopGlyph(i,j);
		}

}

function exGlyph(i,j){
	var glyph = "<span class='glyphicon glyphicon-remove-circle' ";
	glyph += " data-row='"+ i + "' data-col='" + j + "'>";
	return glyph;		
};

function questionGlyph(i,j) {
	var glyph = "<span class='glyphicon glyphicon-question-sign' ";
	glyph += " data-row='"+ i + "' data-col='" + j + "'>";
	return glyph;
}
