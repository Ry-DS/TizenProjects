"use strict";
var listEdit={
	ready:
function(id){
		return !($('#'+id).hasClass('ui-arc-listview'))
},
	before: 
function (id){
	if(this.ready(id))
		return;
	tau.widget.Listview(document.getElementById(id)).destroy();
	tau.widget.Listview(document.getElementById(id)).destroy();
	$('#'+id).toggleClass('ui-arc-listview ui-arc-listview-3');
	
},
	after:
function (id){
		let marquees=document.getElementsByClassName('ui-marquee');
		
		for (var i = 0, len = marquees.length; i < len; i++) {
			new tau.widget.Marquee(marquees[i], {marqueeStyle: "scroll", delay: "3000"}).start();
		}	
		
		tau.widget.Listview(document.getElementById(id));
		$('.marquee').marquee();
	
	
},
	edit:
function(id,editFunc){
		this.before(id);
		setTimeout(()=>{
			editFunc();
			this.after(id);
		},100);
}

}