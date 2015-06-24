/**
 * Created by Toine Bakkeren on 6/2/2015.
 */

/** Generate Game Board
 *
 * $(document).ready(function () {
    Generate.start()
});
 * */
 var localid = null;

 function gameView(model){
 	var self = this;

 	self._model = model;

    self.loadView = function(callBack) {
        $('.container').load("views/gameboardView.html", function(){
            callBack();
        } );
        //console.log("Field")
    }

    self.renderfield = function(){
    	//dostuff
    }
 }

 function gameModel(){
 	var self = this;

    self.shoot = function (x, y){

        var shot = {
            "x":x, 
            "y":y
        };

        $.ajax({
            type: "POST",
            url: 'https://zeeslagavans.herokuapp.com/'+'games/'+ localid +'/shots' + '?token=' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4", 
            data: shot,
            succes: function() {
                console.log("Post shots is gedaan");
            }
        });
    }

    self.getGame = function(gameID, callback) {
        $.ajax({
            type: "GET",
            url: 'https://zeeslagavans.herokuapp.com/'+'games/'+ gameID + '?token=' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4", 
            success: function(result) {
                callback(result);
            }
        });
    }

    self.postGameboard = function(obj) {
        $.ajax({
            type: "POST",
            url: 'https://zeeslagavans.herokuapp.com/'+'games/'+ localid +'/gameboard' + '?token=' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4", 
            data: obj,
            succes: function() {
                console.log("Post is gedaan");
            }
        });
    }
 }

 function gameController(gameId){
 	var self = this;
 	self.localid = gameId;
 	self.model = new gameModel;
 	self.gameView = new gameView(self.model);
    self.boardControl = new gameBoardController();
	
    self.startGame = function(){
        console.log("i get here with: " + self.localid);
        
        self.gameView.loadView(self.initBoard);

    }

    self.initBoard = function() {
        var boardHTML = self.boardControl.generateBoardHTML();

        console.log(boardHTML);

        $('#grid').replaceWith(boardHTML);

        self.model.getGame(self.localid, self.processData);

    }

    self.processData = function(data) {
        console.log('Ik ben er weer');
        console.log(data);

        if (data['status'] === 'setup') {
            $('#beurtIndicator').text("Het is jouw beurt!");
        }
        else {
            if (data['yourTurn'] === true) {
                $('#beurtIndicator').text("Het is jouw beurt!");
                console.log('Jouw beurt');
            }
            else {
                $('#beurtIndicator').text("Het is de tegenstander zijn beurt!");
                console.log('Niet jouw beurt');
            }
        }
        
    }

 }


 



