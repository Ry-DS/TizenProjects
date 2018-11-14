var listEdit={
	before: 
function (id){
	tau.widget.Listview(document.getElementById(id)).destroy();
	$('#'+id).toggleClass('ui-arc-listview ui-arc-listview-3')
	
},
	after:
function (id){
	tau.widget.Listview(document.getElementById(id))
}
}