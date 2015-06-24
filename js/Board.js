/**
 * Created by Toine Bakkeren on 6/2/2015.
 */
function GameBoard() {

}

(function (Generate, $) {
    var GRID_ROWS = 10,
        GRID_COLS = 10,
        GRID_ELEMENT;

    Generate.config = {
        gridContainer: "grid",
        matrixContainer: "matrix",
        matrixHeader: "matrixHeader"
    };

    Generate.start = function () {
        clearScreen();
        generateBoardPage();
        createGrid();
        console.log("Het bord staat klaar");
    };

    function createGrid() {
        GRID_ELEMENT = $("#" + Generate.config.gridContainer);
        var cell; // Contains the 1 or 0 based upon the cell selection
        var newGrid = $('<div id="grid" class="gridContainer" ></div>');


        for (var i = 1; i <= GRID_ROWS; i++) {
            for (var j = 1; j <= GRID_COLS; j++) {
                $("<div class='cell' id='"+ String.fromCharCode(65+i) +","+j+"'></div>")
                    .appendTo(newGrid);
            }
        }

        newGrid.height(38 * GRID_ROWS);
        newGrid.width(38 * GRID_COLS);
        newGrid.on('click', '.cell', cellClick);
        GRID_ELEMENT.replaceWith(newGrid);
    }

    function cellClick() {
        $(this).text($(this).text() == "" ? "1" : "");
    }

    function clearScreen() {
        $('#container').html('');
        console.log("Ik heb het scherm leeg gemaakt!");
    }

    function generateBoardPage() {
        $('.container').append(
        '<div class="col-xs-6">' +
        '       <div id="zeeslag" class="zeeslag">' +
        '           <div id="zeeslagHeader">' +
        '               <h2>Zeeslag</h2>' +
        '           </div>' +
        '           <div id="grid" class="gridContainer"></div>' +
        '       </div>' +
        '    </div>');
    }

}(jQuery));

