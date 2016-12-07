
//Classes for generating knight tours.

/*
* A Cell is a square on the chessboard.
*/
class Cell {
		
	constructor(rowNum, colNum, board) {
		this.rowNum = rowNum;
		this.colNum = colNum;
		this.board = board;
		//console.log("created cell " + rowNum + " " + colNum );
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
	
	degree(){
		return this.neighbors().length;
	}
	
	toString() {
		return "Cell [" + this.rowNum + "][" + this.colNum +"]: " + this.degree();
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
};


var board = new Board(4,4);
board.init();
console.log("Hello World");
console.log(" 4x4" + board.toString());

board = new Board(1,1);
board.init();
console.log(" 1x1" + board.toString());

board = new Board(3,3);
board.init();
console.log(" 3x3" + board.toString());

board = new Board(8,8);
board.init();
console.log(" 8x8" + board.toString());


/*
* A path through the chessboard.
*/
class Path {
	
};