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

    self.loadView = function() {
        $('.container').load("views/gameboardView.html");
        console.log("Field")
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

 function gameController(id){
 	var self = this;
 	self.localid = id;
 	self.model = new gameModel;
 	self.gameView = new gameView(self.model);
	console.log("i get here with: " + localid);
	self.gameView.loadView();
 }


 



