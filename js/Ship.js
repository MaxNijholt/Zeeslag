/**
 * Created by toinebakkeren on 09/06/15.
 */

function ShipsModel() {

    self = this;

    self.getShipsFromAPI = function(callBack, optional) {
        $.ajax({
            url:    'https://zeeslagavans2.herokuapp.com/ships?token='
            + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4",
            success: function(result) {
                
                if (typeof optional === "undefined") {
                   callBack(result); 
               }
               else {
                    callBack(result, optional);
               }
            },
            dataType: "json"
        });
    }

    self.getShipsForProcessing = function() {
        $.getJSON( "https://zeeslagavans2.herokuapp.com/ships?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4");
    }
}
