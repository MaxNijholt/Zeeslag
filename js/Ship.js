/**
 * Created by toinebakkeren on 09/06/15.
 */

function ShipsModel() {

    this.getShipsFromAPI = function(callback) {
        $.ajax({
            url:    'https://zeeslagavans.herokuapp.com/ships?token='
            + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFtYmFra2VyMUBhdmFucy5ubCI.opl6vYsBdYBruG9cnZz2P_JnN4b60T7XOjs4-DmZbYk",
            success: function(result) {
                callback(result);
            },
            dataType: "json"
        });
    }
    
}
