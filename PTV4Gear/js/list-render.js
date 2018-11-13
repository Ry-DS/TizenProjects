let mainPage=document.getElementById('main');
let elList = document.getElementById("nearbyList"),
/* All config options can be found in virtual list reference */
vlist = tau.widget.VirtualListview(elList, {
   dataLength: DATA.length,
   bufferSize: 40
});
(function(){

mainPage.addEventListener("pagebeforeshow", function () {
/* Get HTML element reference */

/* Update list items */
vlist.setListItemUpdater(function(elListItem, newIndex) {
   let data = DATA[newIndex];
   if(data.HTML)
   elListItem.innerHTML = data.HTML;
   if(data.CLASSES)
   data.CLASSES.forEach((s)=>elListItem.classList.add(s));
   
});
vlist.draw();

});

mainPage.addEventListener("pagehide", function () {
	// Remove all children in the vlist
	vlist.destroy();
	});


})();