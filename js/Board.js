/**
 * Created by Toine Bakkeren on 6/2/2015.
 */

var points = [];

function gameBoardView() {
    self = this;

    self.setShip = function() {

    }
}

function gameBoardController() {

    self = this;

    console.log("Ik heb een gameboardcontrollert aangemaakt");

    self.generateBoardHTML = function() {
        var GRID_ROWS = 10,
        GRID_COLS = 10;

        var cell; // Contains the 1 or 0 based upon the cell selection
        var newGrid = $('<div id="grid" class="gridContainer"></div>');

        for (var i = 1; i <= GRID_ROWS; i++) {
            for (var j = 1; j <= GRID_COLS; j++) {
                $("<div class='cell' posX='"+ String.fromCharCode(65+i) +"' posY='"+j+"'></div>")
                    .appendTo(newGrid);
            }
        }

        newGrid.height(38 * GRID_ROWS);
        newGrid.width(38 * GRID_COLS);
        //newGrid.on('click', '.cell', self.cellClick);

        console.log(points);
        return newGrid;
    };

    self.placeShip = function(startCell, length, horizontal) {
        console.log(startCell);
        console.log(length);
        console.log(horizontal);
    }
}

