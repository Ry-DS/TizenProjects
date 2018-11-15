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
		for(let el of marquees){
			new tau.widget.Marquee(el, {marqueeStyle: "scroll", delay: "3000"}).start();
		}
		tau.widget.Listview(document.getElementById(id));
	
	
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