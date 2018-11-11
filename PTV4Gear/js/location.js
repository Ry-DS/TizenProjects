var coords;//global coords var. Should have coords of user if found
(function(){//keep vars here in local scope
	let list=$('#nearbyList');
	let id=setInterval(()=>{
		if(list.length>1){
			console.log("entered removing...");
			while(list.length!=1){
				list.last().remove();
				console.log("removing...");
			}
			
		}
		list.append('<li class=\"ui-li-grid\"> <div>Finding Location</div> <div class=\"ui-processing\"></div></li>');//processing animation
		navigator.geolocation.getCurrentPosition((pos)=>{
			coords=pos.coords;
			clearInterval(id);
			list.last().remove();
			list.append('<li><a id=\"refreshNearby\">Refresh</a></li>');
			document.getElementById('refreshNearby').onclick=()=>{
				reloadJs('js/location.js');
				
			}
			
		
		},()=>{
			list.last().remove();
			list.append('<li class=\"li-has-multiline\">No Location<span class=\"ui-li-sub-text li-text-sub\">Retrying in 3 seconds...</span></li>');
			
		},{timeout: 7000});
	
	},10000);
	
	
})();
