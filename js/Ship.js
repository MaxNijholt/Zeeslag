/**
 * Created by toinebakkeren on 09/06/15.
 */

function ShipsModel() {

    this.getShipsFromAPI = function(callback) {
        $.ajax({
            url:    'https://zeeslagavans.herokuapp.com/ships?token='
            + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4",
            success: function(result) {
                callback(result);
            },
            dataType: "json"
        });
    }
    
    
}
