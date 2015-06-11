/**
 * Created by toinebakkeren on 09/06/15.
 */

function StartView(model){
    this._model = model;

    this.loadView = function() {
        $('.container').load("views/startView");
        console.log("Henkie testie")
    }
}

function StartModel() {
    /** Een leeg model */
}

function StartController(view, model) {
    this._model = model;
    this._view = view;

    this.startGame = function() {
        this._view.loadView();
        this.addActions();
    }

    this.addActions = function() {
        $('body').on('click','#play-button',function(){
            console.log("Play button pressed");
            var gamesModel = new GamesModel();
            var gamesView = new GamesView(gamesModel);
            var gamesController = new GamesController(gamesView,gamesModel);

            gamesController.renderView();
        });

        $('body').on('click','#rules-button',function(){
            console.log("Play rules pressed");
        });

        $('body').on('click','#about-button',function(){
            console.log("Play about pressed");
        });
    }

}

$(document).ready(function () {
    var startModel = new StartModel();
    var startView = new StartView(startModel);
    var startController = new StartController(startView, startModel);
    startController.startGame();
})