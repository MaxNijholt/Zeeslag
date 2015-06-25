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

    self.renderBoats = function(ships){
        $('.available-ships').remove();
        var shipsHTML = "<div class='available-ships col-md-3 panel panel-default' style='margin-top:10px;'><h3>Beschikbare schepen</h3></div>"
        $(shipsHTML).appendTo('#zeeslag');
    	console.log(ships);

        var htmleen = '<table class="table">';
        var htmltwee = '';
        var htmldrie = '</table>';

        $.each(ships, function(key, value) {
            var ship = 	'<tr>' +
                			'<td> <button class="ship btn btn-default" shiplength="' + value.length + '" shipname="' + value.name + '">'+ value.name + '</button></td>' +
                    	'</tr>';
            htmltwee = htmltwee + ship;
                       
        });

        var htmlcompleet = htmleen + htmltwee + htmldrie;
        $(htmlcompleet).appendTo('.available-ships');
        console.log('Klaar');
    }

    self.renderFielddata = function(game){
    	console.log(game);
    	$.each(game.myGameboard.ships, function(key, value){
    		for (var i = 0; i < value.length; i++) {
    			if(value.isVertical){
					var posx = value.startCell.x.toUpperCase();
					var posy = value.startCell.y+i;
                    $("[posx='"+ posx + "'][posy='"+ posy + "']").css("backgroundColor", "blue");
    			}else{
    				var posx = String.fromCharCode(value.startCell.x.toUpperCase().charCodeAt(0)+i);
    				var posy = value.startCell.y;
                       $("[posx='"+ posx + "'][posy='"+ posy + "']").css("backgroundColor", "blue");
    			}
    		};
    	});
    	$.each(game.myGameboard.shots, function(key, value){
			var posx = value.x.toUpperCase();
			var posy = value.y;
			if($("[posx='"+ posx + "'][posy='"+ posy + "']").css("backgroundColor") == 'rgb(0, 0, 255)'){
				$("[posx='"+ posx + "'][posy='"+ posy + "']").css("backgroundColor", "red");
			}else {
				$("[posx='"+ posx + "'][posy='"+ posy + "']").css("backgroundColor", "yellow");
			}
			
    	});
    }
 }

 function gameModel(){
 	var self = this;

    self.shoot = function (gameID, x, y){

        var shot = {
            "x":x, 
            "y":y
        };
        var msg = '';

        $.ajax({
            type: "POST",
            url: 'https://zeeslagavans2.herokuapp.com/'+'games/'+ gameID +'/shots' + '?token=' + 
            	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4", 
            data: shot,
            success: function(data) {
                msg = data.toLowerCase();
            }
        });
        return msg;
    }

    self.getGame = function(gameID, callback) {
        $.ajax({
            type: "GET",
            url: 'https://zeeslagavans2.herokuapp.com/'+'games/'+ gameID + '?token=' + 
            	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4", 
            success: function(result) {
                callback(result);
            }
        });
    }

    self.postGameboard = function(gameID, obj) {
    	var myurl = 'https://zeeslagavans2.herokuapp.com/'+'games/'+ gameID +'/gameboards' + '?token=' + 
            	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4";

            	console.log(" posting to : " + myurl);

        $.ajax({
            type: "POST",
            url: 'https://zeeslagavans2.herokuapp.com/'+'games/'+ gameID +'/gameboards' + '?token=' + 
            	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4", 
            data: obj,
            success: function() {
                console.log("Post gameboard is gedaan");
            },
            error: function(xhr){
            	console.log("post failed to " + myurl);
            	console.log("post failed with " + obj);
            }
        });
    }
 }

 function gameController(gameId){
 	var self = this;
 	self.localid = gameId;
    self.selectedShip;

 	self.model = new gameModel;
 	self.gameView = new gameView(self.model);

    self.shipModel = new ShipsModel();
    self.ships = 'undefined';

    $.ajax({
            url:    'https://zeeslagavans2.herokuapp.com/ships?token='
            + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4",
            success: function(result) {
                self.ships = result;
            },
            dataType: "json"
        });

    self.boardControl = new gameBoardController();
	
    self.startGame = function(){
        console.log("i get here with: " + self.localid);
        self.gameView.loadView(self.initBoard);

    }

    self.initBoard = function() {
        var boardHTML = self.boardControl.generateBoardHTML();
        $('#grid').replaceWith(boardHTML);
        self.model.getGame(self.localid, self.processData);

    }

    self.processData = function(data) {
        console.log('Ik ben er weer');
        console.log(data);

        if (data['status'] === 'setup') {
            $('#beurtIndicator').text("Zet je schepen neer om te beginnen.");
            self.shipModel.getShipsFromAPI(self.gameView.renderBoats);
            window.setTimeout(self.setupMode,1000);
        }
        else {
        	self.model.getGame(gameId, self.gameView.renderFielddata);
            self.shootingMode();

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

    self.setupMode = function() {

        var shipData = [];
        var placedShips = 0;

        $('.container').on('click','.ship',function(){
            self.selectedShip = $(this).attr('shipname');
            self.selectedShipLength = $(this).attr('shiplength');

            console.log("setupmode "+self.selectedShip);
            this.disabled = true;
        });

        $('.container').on('click', '.cell', function() {

            if ( typeof self.selectedShip === "undefined") {
                if ($(this).css("backgroundColor") === 'rgb(0, 0, 255)') {
                    self.boardControl.turnShip($(this), self.selectedShipLength, true, shipData);                                                  
                } else{
                    alert("Selecteer eerst een schip");
                }
            }
            else{
                self.boardControl.placeShip($(this), self.selectedShipLength);
                placedShips++;
                
                var ship = {name:self.selectedShip, length:self.selectedShipLength, startX:$(this).attr('posx'), startY:$(this).attr('posy'), horizontal:false};
                shipData.push(ship);
                console.log("setupmode "+shipData);

                self.selectedShip = undefined;
            }
        });

        $('.container').on('click','#btn-back',function(){
            self.openGamesScreen();
        });

        $('.container').on('click','#btn-send',function(){
            if (shipData.length < 5) {
                alert('Je moet alle schepen op het veld zetten!');
            }
            else {
                self.postSetup(shipData);
            }
        });
    }

    self.postSetup = function(shipData) {
        //console.log(JSON.stringify(shipData));
        console.log(self.ships);
        console.log(shipData);

        $.each(shipData, function(key, value) {
            $.each(self.ships, function(jan, henk) {
                if (value.name === henk.name) {
                    henk.startCell = {"x": value.startX.toLowerCase(), "y": value.startY};
                    if (value.horizontal === true) {
                        henk.isVertical = false;
                    } else {
                        henk.isVertical = true;
                    }
                }
                           
            });            
        });

        var postdata = {"ships" : self.ships }
        console.log(postdata);

        self.model.postGameboard(gameId, postdata);

        self.openGamesScreen();

    }

    self.shootingMode = function() {
        $('.container').on('click', '.cell', function() {
            console.log(self.model.shoot(gameId, $(this).attr('posx'), $(this).attr('posy')));
                if ($(this).css("backgroundColor") === 'rgb(255, 0, 0)' || $(this).css("backgroundColor") === 'rgb(255, 255, 0)') {
                    alert('Je hebt hier al een keer geschoten!');                                                  
                } else{
                    if (self.model.shoot(gameId, $(this).attr('posx'), $(this).attr('posy')) === "boom" ) {
                        $(this).css("backgroundColor", "red");
                    }
                    if (self.model.shoot(gameId, $(this).attr('posx'), $(this).attr('posy')) === "splash" ) {
                        $(this).css("backgroundColor", "yellow");
                    }
                }
        });
        $('.container').on('click','#btn-back',function(){
            self.openGamesScreen();
        });

        $('.container').on('click','#btn-send',function(){
            if (shipData.length < 5) {
                alert('Je moet alle schepen op het veld zetten!');
            }
            else {
                self.postSetup(shipData);
            }
        });
    }

    self.openGamesScreen = function() {
        app.gamesController.renderView();    
    }
 }


 



