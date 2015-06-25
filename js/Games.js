/**
 * Created by toinebakkeren on 10/06/15.
 */

/**
 * Created by toinebakkeren on 09/06/15.
 */

function GamesView(model){
    this._model = model;

    var self = this;

    self.loadView = function() {
        $('.container').load("views/gamesView.html");

        console.log("Laad de games view in")
    }

    self.renderGames = function(array){
        console.log("Ik ben weer in de view!");
        console.log(array);

        $('#games-list').html('');

        var htmleen =  '<div class="panel panel-default">' +
                '<table class="table">' +
                '<tr>' +
                '<td><b>Game-ID</b></td>' +
                '<td><b>Tegenstander</b></td>' +
                '<td><b>Status</b></td>' +
                '</tr>';
        var htmltwee = '';
        var htmldrie = '</div>';
        $.each(array, function(key, value) {
            if(value.enemyName == undefined){
                value.enemyName = "Tegenstander wordt gezocht!";
                htmltwee = htmltwee + 
                '<tr id="update-stuk">' +
                    '<td id="id">' + value._id + '</td>' +
                    '<td id="name">' + value.enemyName + '</td>' +
                    '<td id="status">' + value.status + '</td>' +
                    '<td><button id="noplaybutton" class="btn btn-default disabled" gameID='+ value._id +'>Play</button></td>'
                '</tr>';
            } else{
                htmltwee = htmltwee + 
                '<tr id="update-stuk">' +
                    '<td id="id">' + value._id + '</td>' +
                    '<td id="name">' + value.enemyName + '</td>' +
                    '<td id="status">' + value.status + '</td>' +
                    '<td><button id="playbutton" class="btn btn-primary" gameID='+ value._id +'>Play</button></td>'
                '</tr>';
            }
            
            console.log(key, value);
            
        });

        var htmltotaal = htmleen + htmltwee + htmldrie;

        $(htmltotaal).appendTo($('#games-list'));
    }
}

function GamesModel() {

    var self = this;

    self.TheGame = null;

    self.getGamesFromAPI = function(callback) {
        $.ajax({
            url:    'https://zeeslagavans2.herokuapp.com/users/me/games?token='
            + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4",
            success: function(result) {
                callback(result);
            },
            dataType: "json"
        });
    }

    self.submitNewGame = function(){
        
    }

    self.getAIGame = function(){
        $.ajax({
            url:    'https://zeeslagavans2.herokuapp.com/'+ 'games/AI' +'?token='
            + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4",
            success: function() {
                console.log("ai game gemaakt");
            },
            dataType: "json"
        });
    }

    self.getHumanGame = function(){
        $.ajax({
            url:    'https://zeeslagavans2.herokuapp.com/'+ 'games' +'?token='
            + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4",
            success: function() {
                console.log("human game gemaakt");
            },
            dataType: "json"
        });
    }

    self.deleteGames = function() {
        $.ajax({
            url: 'https://zeeslagavans2.herokuapp.com/'+'users/me/games'+'?token=' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4', 
            type: 'DELETE',
            succes: function() {
                console.log("games verwijderd");
            }
        });
    }



}

function GamesController(view, model) {
    var self = this;
    self._model = model;
    self._view = view;

    model.getGamesFromAPI(view.renderGames);

    self.renderView = function() {
        self._view.loadView();
        self.addActions();
    }

    self.addActions = function() {
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

        $('body').on('click','#new-game-button-pc',function(){
            model.getAIGame();
            model.getGamesFromAPI(view.renderGames);
        });

        $('body').on('click','#new-game-button-human',function(){
            model.getHumanGame();
            model.getGamesFromAPI(view.renderGames);
        });

        $('body').on('click','#delete-games-button',function(){
            model.deleteGames();
            model.getGamesFromAPI(view.renderGames);
        });

        $('body').on('click','#playbutton',function(){
            var gameId = $(this).attr('gameID');
            console.log(gameId);
            //debugger;
            //app.game(gameId);
            var game = new gameController(gameId);
            game.startGame();
        });
    }
    /*
    var server = 'https://zeeslagavans.herokuapp.com/';
    var options = {
      query: "token=" + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4' ,
    };
    var socket = io.connect(server, options);

    socket.on('update', function(gameId){
        model.getGamesFromAPI(view.renderGames);
    });*/
}
