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
                $("<div class='cell' posX='"+ String.fromCharCode(64+j) +"' posY='"+i+"' title="+String.fromCharCode(64+j)+i+" ></div>")
                    .appendTo(newGrid);
            }
        }
        $(cell).tooltip();

        newGrid.height(38 * GRID_ROWS);
        newGrid.width(38 * GRID_COLS);
        //newGrid.on('click', '.cell', self.cellClick);

        console.log(points);
        return newGrid;
    };

    self.placeShip = function(startCell, length) {
        console.log(startCell);
        console.log(length);

        $(startCell).css("backgroundColor", "blue");
        for (var i = 1; i < length; i++) {
            var posy = parseInt($(startCell).attr('posy'))+i;
            var posx = $(startCell).attr('posx');
            console.log(posy);

            $("[posx='"+ posx + "'][posy='"+ posy + "']").css("backgroundColor", "blue");
        }
    }
    

    self.turnShip = function(startCell, length, horizontal, shipData) {

        for (ship of shipData) {
            if (ship.startX === $(startCell).attr('posx') && ship.startY === $(startCell).attr('posy')) {
                if (ship.horizontal === false) {
                    $(startCell).css("backgroundColor", "white");
                    for (var i = 1; i < length; i++) {
                        var posy = parseInt($(startCell).attr('posy'))+i;
                        var posx = String.fromCharCode($(startCell).attr('posx').charCodeAt(0));
                        console.log(posy);

                        $("[posx='"+ posx + "'][posy='"+ posy + "']").css("backgroundColor", "white");
                    }

                    $(startCell).css("backgroundColor", "blue");
                    for (var i = 1; i < length; i++) {
                        var posy = parseInt($(startCell).attr('posy'));
                        var posx = String.fromCharCode($(startCell).attr('posx').charCodeAt(0)+i);
                        console.log(posy);

                        $("[posx='"+ posx + "'][posy='"+ posy + "']").css("backgroundColor", "blue");
                    }

                    ship.horizontal = true;
                }
                else {
                    $(startCell).css("backgroundColor", "white");
                    for (var i = 1; i < length; i++) {
                        var posy = parseInt($(startCell).attr('posy'));
                        var posx = String.fromCharCode($(startCell).attr('posx').charCodeAt(0)+i);
                        console.log(posy);

                        $("[posx='"+ posx + "'][posy='"+ posy + "']").css("backgroundColor", "white");
                    }

                    $(startCell).css("backgroundColor", "blue");
                    for (var i = 1; i < length; i++) {
                        var posy = parseInt($(startCell).attr('posy'))+i;
                        var posx = String.fromCharCode($(startCell).attr('posx').charCodeAt(0));
                        console.log(posy);

                        $("[posx='"+ posx + "'][posy='"+ posy + "']").css("backgroundColor", "blue");
                    }

                    ship.horizontal = false;
                }
            }
        }
        


    }
}

