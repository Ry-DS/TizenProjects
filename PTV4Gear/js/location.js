var coords;//global coords var. Should have coords of user if found
var running=false;
document.addEventListener("pageshow", function () {
	if(running){
		return;
    } else running = true;//Stops program from starting again when page is refreshed
	
	let list=$('#nearbyList');
	let loop=function loop(){

        $('#refreshNearby').remove();//remove refresh button if there
		listEdit.edit('nearbyList',()=>
		list.append('<li class=\"ui-li-grid\"> <a href=\"index-old.html\"><div>Locating</div></a> <div class=\"ui-processing\"></div></li>'
				));//processing animation


        navigator.geolocation.getCurrentPosition((pos) => {//start trying to locate
            coords = pos.coords;//store if sucessfull for PTV api
			
			$('#main').append('<footer class=\"ui-footer ui-bottom-button ui-fixed\">\
					<button class=\"ui-btn\" id=\"refreshNearby\">Refresh</button>\
					</footer>');
			document.getElementById('refreshNearby').onclick=()=>{
				loop();

            };//add refresh button
            ptv.populateNearby(coords);//ask ptv to populate nearbyList with global coords

			
			
		
		},()=>{

            listEdit.edit('nearbyList', () =>//add fail message
				list.append('<li class=\"li-has-multiline\">No Location<span class=\"ui-li-sub-text li-text-sub\">Retrying in 5 seconds...</span></li>'
						));
				
		
			
			setTimeout(loop,5000);
        }, {timeout: 15000});
		
	};
	loop();
	
	
	
	

});
