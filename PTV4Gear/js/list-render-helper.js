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
	tau.widget.Listview(document.getElementById(id))
},
	edit:
function(id,editFunc){
		this.before(id);
		setTimeout(()=>{
			editFunc();
			this.after(id);
		},50);
}

}