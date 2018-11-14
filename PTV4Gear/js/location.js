var coords;//global coords var. Should have coords of user if found
document.addEventListener("pageshow", function () {
	
	let list=$('#nearbyList');
	let loop=function loop(){
		
		listEdit.edit('nearbyList',()=>
		list.append('<li class=\"ui-li-grid\"> <div>Locating</div> <div class=\"ui-processing\"></div></li>'
				));//processing animation
		list.append('<li class=\"ui-li-grid\"> <div>Locating</div> <div class=\"ui-processing\"></div></li>'
		));//processing animation
list.append('<li class=\"ui-li-grid\"> <div>Locating</div> <div class=\"ui-processing\"></div></li>'
));//processing animation
list.append('<li class=\"ui-li-grid\"> <div>Locating</div> <div class=\"ui-processing\"></div></li>'
));//processing animation

		navigator.geolocation.getCurrentPosition((pos)=>{
			coords=pos.coords;
			
			
			
			listEdit.edit('nearbyList',()=>{
			list.append('<li><a id=\"refreshNearby\">Refresh</a></li>');
			document.getElementById('refreshNearby').onclick=()=>{
				loop();
				
			};
			});
			
			
		
		},()=>{
			
				listEdit.edit('nearbyList',()=>
				list.append('<li class=\"li-has-multiline\">No Location<span class=\"ui-li-sub-text li-text-sub\">Retrying in 5 seconds...</span></li>'
						));
				
		
			
			setTimeout(loop,5000);
		},{timeout: 7000});
		
	};
	loop();
	
	
	
	

});
