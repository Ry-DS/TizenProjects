var coords;//global coords var. Should have coords of user if found
var running=false;
document.addEventListener("pageshow", function () {
	if(running){
		return;
	}else running=true;
	let list=$('#nearbyList');
	let loop=function loop(){
		$('#refreshNearby').remove();
		listEdit.edit('nearbyList',()=>
		list.append('<li class=\"ui-li-grid\"> <a href=\"index-old.html\"><div>Locating</div></a> <div class=\"ui-processing\"></div></li>'
				));//processing animation
		

		navigator.geolocation.getCurrentPosition((pos)=>{
			coords=pos.coords;
			
			
			
			/*listEdit.edit('nearbyList',()=>{
			list.append('<li><a id=\"refreshNearby\">Refresh</a></li>');
			document.getElementById('refreshNearby').onclick=()=>{
				loop();
				
			};
			});*/
			$('#main').append('<footer class=\"ui-footer ui-bottom-button ui-fixed\">\
					<button class=\"ui-btn\" id=\"refreshNearby\">Refresh</button>\
					</footer>');
			document.getElementById('refreshNearby').onclick=()=>{
				loop();
				
			};
			
			
		
		},()=>{
			
				listEdit.edit('nearbyList',()=>
				list.append('<li class=\"li-has-multiline\">No Location<span class=\"ui-li-sub-text li-text-sub\">Retrying in 5 seconds...</span></li>'
						));
				
		
			
			setTimeout(loop,5000);
		},{timeout: 7000});
		
	};
	loop();
	
	
	
	

});
