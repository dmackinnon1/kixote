
//Classes for generating knight tours.

/*
* A Cell is a square on the chessboard.
*/
class Cell {
		
	constructor(rowNum, colNum, board) {
		this.rowNum = rowNum;
		this.colNum = colNum;
		this.board = board;
		this.decoration = "*";
	}
	
	nne(){
		if ((this.rowNum + 2 < this.board.getRowSize())&&(this.colNum + 1 <this.board.getColumnSize())){
			return this.board.cells[this.rowNum + 2][this.colNum + 1];
		}
		return null;
	}
	
	nnw(){
		if ((this.rowNum + 2 < this.board.getRowSize())&&(this.colNum - 1 >= 0)){ 
			return this.board.cells[this.rowNum + 2][this.colNum - 1];
		}
		return null;
	}
	
	ene(){
		if ((this.rowNum + 1 < this.board.getRowSize())&&(this.colNum +2 < this.board.getColumnSize())){
			return this.board.cells[this.rowNum + 1][this.colNum + 2];
		}
		return null;		
	}
	
	wnw(){
		if ((this.rowNum + 1 < this.board.getRowSize())&&(this.colNum - 2 >= 0)){ 
			return this.board.cells[this.rowNum + 1][this.colNum - 2];
		}
		return null;
	}
	
	sse(){
		if ((this.rowNum - 2 >= 0)&&(this.colNum + 1 < this.board.getColumnSize())){ 
			return this.board.cells[this.rowNum - 2][this.colNum + 1];
		}
		return null;
	}
	
	ese(){
		if ((this.rowNum - 1 >= 0)&&(this.colNum + 2 < this.board.getColumnSize())){ 
			return this.board.cells[this.rowNum - 1][this.colNum + 2];
		}
		return null;
	}
	
	ssw(){
		if ((this.rowNum - 2 >= 0)&&(this.colNum - 1 >= 0)){ 
			return this.board.cells[this.rowNum - 2][this.colNum - 1];
		}	
		return null;
	}
	
	wsw(){
		if ((this.rowNum - 1 >= 0)&&(this.colNum - 2 >= 0)){ 
			return this.board.cells[this.rowNum - 1][this.colNum - 2];
		}	
		return null;
	}
	
	neighbors(){
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
	
	isNeighbor(cell) {
		var nbrs = this.neighbors();
		for (var i = 0; i < nbrs.length; i ++) {
			if (cell.isEqual(nbrs[i])) return true;
		}
		return false;
	}
	
	degree(){
		return this.neighbors().length;
	}
	
	toString() {
		return "Cell [" + this.rowNum + "][" + this.colNum +"]: " + this.decoration;
	}
	
	isEqual(other) {
		return this.rowNum === other.rowNum && this.colNum === other.colNum;
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
			//console.log("created row " + i);
			for (var j = 0; j < this.colNum; j ++){
				//console.log("created entry " + i + " " + j);
				this.cells[i].push (new Cell(i, j, this));
			}
		}
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
	
	size(){
		return this.cells.length;
	}
	
	contains(cell) {
		for(var i; i < this.cells.length; i++){ 
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
		for(var i; i < nlist.length; i++){
			var c = nlist[i]; 
			if(!this.contains(c)) freeDegree ++;	
		}
		return freeDegree;
	}
	
	warnsdorffPath(){
		var currentCell = this.start;
		this.add(currentCell);
		var boardSize = this.board.getSize();
		var options = [];
		var leasts = [];
		var currentValue = null;
		while(this.size() < boardSize){
			var leastValue = 8; // magic number: most number of knight moves from a square on a 2d board is 8
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
		return this.cells[cells.length -1];
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
* utilities
*/
function randomInt(lessThan){
	return Math.floor(Math.random()*lessThan);
};