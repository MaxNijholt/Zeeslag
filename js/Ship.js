/**
 * Created by toinebakkeren on 09/06/15.
 */

function ShipsModel() {

    self = this;

    self.getShipsFromAPI = function(callBack) {
        $.ajax({
            url:    'https://zeeslagavans.herokuapp.com/ships?token='
            + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4",
            success: function(result) {
                callBack(result);
            },
            dataType: "json"
        });
    }

    self.getShipsForProcessing = function() {
        return $.getJSON( "https://zeeslagavans.herokuapp.com/ships?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4", function(data) {
            returnData  = JSON.parse(data);
            console.log(returnData);
            return returnData;
        });
    }
}
