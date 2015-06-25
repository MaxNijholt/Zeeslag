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
            var ship = '<tr>' +
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
            url: 'https://zeeslagavans.herokuapp.com/'+'games/'+ localid +'/shots' + '?token=' + 
            	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4", 
            data: shot,
            succes: function() {
                console.log("Post shots is gedaan");
            }
        });
    }

    self.getGame = function(gameID, callback) {
        $.ajax({
            type: "GET",
            url: 'https://zeeslagavans.herokuapp.com/'+'games/'+ gameID + '?token=' + 
            	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4", 
            success: function(result) {
                callback(result);
            }
        });
    }

    self.postGameboard = function(gameID, obj) {
        $.ajax({
            type: "POST",
            url: 'https://zeeslagavans.herokuapp.com/'+'games/'+ gameID +'/gameboard' + '?token=' + 
            	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4", 
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
    self.selectedShip;

 	self.model = new gameModel;
 	self.gameView = new gameView(self.model);

    self.shipModel = new ShipsModel();

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
            $('#beurtIndicator').text("Zet je schepen neer om te beginnen.");
            self.shipModel.getShipsFromAPI(self.gameView.renderBoats);
            window.setTimeout(self.setupMode,1000);
        }
        else {
        	self.model.getGame(gameId, self.gameView.renderFielddata);

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

        console.log('Klikkers');
        $('.container').on('click','.ship',function(){
            self.selectedShip = $(this).attr('shipname');
            self.selectedShipLength = $(this).attr('shiplength');

            console.log(self.selectedShip);
            this.disabled = true;
        });

        $('.container').on('click', '.cell', function() {

            if ( typeof self.selectedShip === "undefined") {
                if ($(this).css("backgroundColor") === 'rgb(0, 0, 255)') {
                    console.log('Draai');
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
                console.log(shipData);

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
        var ships = self.shipModel.getShipsForProcessing();
        
        window.setTimeout(console.log(self.shipModel.getShipsForProcessing()),1000);


        self.model.postGameboard(gameId, ships);

        self.openGamesScreen();

    }

    self.openGamesScreen = function() {
        var gamesModel = new GamesModel();
        var gamesView = new GamesView(gamesModel);
        app.gamesController = new GamesController(gamesView,gamesModel);
        app.gamesController.renderView();    
    }
 }


 



