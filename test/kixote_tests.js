console.log("running kixote tests");


QUnit.test( "basicCellCount_test", function( assert ) { 
		var board = new Board(4,4);
		board.init();
		console.log(" 4x4" + board.toString());
		assert.ok(board.cells.length === 4, "should have 4 rows in a 4x4 board");
		assert.ok(board.cells[0].length === 4, "should have 4 columns in a 4x4 board");
	});

QUnit.test( "degenerateNeighbor_test", function( assert ) { 
		var board = new Board(1,1);
		board.init();
		console.log(" 1x1" + board.toString());
		assert.ok(board.cells[0][0].degree() === 0, "cell in a 1x1 board has no neighbors");
	});
	
QUnit.test( "eightByeightNeighbor_test", function( assert ) { 
		var board = new Board(8,8);
		board.init();
		console.log(" 1x1" + board.toString());
		assert.ok(board.cells[0][0].degree() === 2, "cell 00 in a 8x8 board has 2 neighbors");
		assert.ok(board.cells[0][1].degree() === 3, "cell 01 in a 8x8 board has 3 neighbors");
		assert.ok(board.cells[1][1].degree() === 4, "cell 11 in a 8x8 board has 4 neighbors");
	});

	QUnit.test( "warnsdorf_test", function( assert ) { 
		var board = new Board(5,6);
		board.init();
		console.log(board.cells[0][0].toString());
		var path = new Path(board, board.cells[0][0]);
		path.warnsdorffPath();
		path.decorateCells();
		console.log(path.toString());
		assert.ok(true, path.toString());
		assert.ok(true, path.size());
	});
