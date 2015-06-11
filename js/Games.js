/**
 * Created by toinebakkeren on 10/06/15.
 */

/**
 * Created by toinebakkeren on 09/06/15.
 */

function GamesView(model){
    this._model = model;

    this.loadView = function() {
        $('.container').load("views/gamesView.html");

        console.log("Laad de games view in")
    }

    this.renderGames = function(array){
        console.log("Ik ben weer in de view!");
        console.log(array);

        $('#games-list').html('');

        $.each(array, function(key, value) {
            var appendHTML = '<div class="panel panel-default">' +
                '<table class="table">' +
                '<tr>' +
                '<td><b>Game-ID</b></td>' +
                '<td><b>Tegenstander</b></td>' +
                '<td><b>Status</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td>' + value._id + '</td>' +
                '<td>' + value.enemyName + '</td>' +
                '<td>' + value.status + '</td>' +
                '</tr>' +
                '</div>';
            console.log(key, value);
            $(appendHTML).appendTo($('#games-list'));
        });
    }
}

function GamesModel() {

    this.getGamesFromAPI = function(callback) {
        $.ajax({
            url:    'https://zeeslagavans.herokuapp.com/users/me/games?token='
            + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFtYmFra2VyMUBhdmFucy5ubCI.opl6vYsBdYBruG9cnZz2P_JnN4b60T7XOjs4-DmZbYk",
            success: function(result) {
                callback(result);
            },
            dataType: "json"
        });
    }

    this.submitNewGame = function() {
        
    }

}

function GamesController(view, model) {
    this._model = model;
    this._view = view;

    this.renderView = function() {
        this._view.loadView();
        this.addActions();
    }

    this.addActions = function() {
        $('body').on('click','#back-button',function(){
            console.log("Play button pressed");
            var startModel = new StartModel();
            var startView = new StartView(startModel);
            var startController = new StartController(startView,startModel);

            startController.startGame();
        });

        $('body').on('click','#refresh-button',function(){
            model.getGamesFromAPI(view.renderGames);
        });

        $('body').on('click','#new-game-button',function(){
            model.submitNewGame();
        });
    }

}