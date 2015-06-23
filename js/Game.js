/**
 * Created by Toine Bakkeren on 6/2/2015.
 */

/** Generate Game Board
 *
 * $(document).ready(function () {
    Generate.start()
});
 * */

 function gameView(model){
 	this._model = model;

    this.loadView = function() {
        $('.container').load("views/gameboardView");
        console.log("Field")
    }

    this.renderfield = function(){
    	//dostuff
    }
 }

 function gameModel(){

 }

 function gameController(view, model, id){
 	var self = this;
    this._model = model;
    this._view = view;
	console.log("i get here with: " + id);
 }


 



