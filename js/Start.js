/**
 * Created by toinebakkeren on 09/06/15.
 */

function StartView(model){
    var self = this;
    self._model = model;

    this.loadView = function() {
        $('.container').load("views/startView");
    }
}

function StartModel() {
}

function StartController(view, model) {
    var self = this;
    self._model = model;
    self._view = view;

    self.startGame = function() {
        self._view.loadView();
        self.addActions();
    }

    self.addActions = function() {
        $('body').on('click','#play-button',function(){
            console.log("Play button pressed");
            var gamesModel = new GamesModel();
            var gamesView = new GamesView(gamesModel);
            app.gamesController = new GamesController(gamesView,gamesModel);
            app.gamesController.renderView();
        });

        $('body').on('click','#rules-button',function(){
            console.log("Play rules pressed");
        });

        $('body').on('click','#about-button',function(){
            console.log("Play about pressed");
        });
    }
}

app = {
    startController: null, 
    gameController: null, 
    gamesController: null,
    startModel: null, 
    startView: null,
    init: function(){
        app.startModel = new StartModel();
        app.startView = new StartView(app.startModel);
        app.startController = new StartController(app.startView, app.startModel);
        app.startController.startGame();
    },
    game: function(id){
        app.gameController = new gameController(id);
    }
};

$(document).ready(function () {
    app.init();
})