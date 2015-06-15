AjaxHelper = {	
	function GET(path path){
		return $.getJSON("zeeslagavans.herokuapp.com/"+path+"?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im1uaWpob2x0QGF2YW5zLm5sIg.xAuh6X37ts-EcManb6BGyvISDOTCE2xngZoeI2l6H-4", null, function(){
		console.log("succes!")});
	}

}