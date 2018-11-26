const ROUTE_TYPES =
    [{name: 'Train', img: 'ptv_train.png'}
        , {name: 'Tram', img: 'ptv_tram.png'}
        , {name: 'Bus', img: 'ptv_bus.png'}
        , {name: 'VLine', img: 'ptv_regtrain.png'}
        , {name: 'Night Bus', img: 'ptv_regbus.png'}];

var NEARBY_DATA = [];
var ROUTE_NAMES = [];
var SELECTED_NEARBY_STOP;
var ptv_data_util = {
    addNearbyStop:
        function (stop) {
            stop.html = ptv_html_util.parseNearbyStopHtml(stop);
            NEARBY_DATA.push(stop);

        },
    addRoutes:
        function(stop){
            stop.latest_routes.forEach(route=>{
                route.html=ptv_html_util.parseRouteHtml(route);
            })
        },
    renderNearbyStops:
        function (id) {
            listEdit.edit(id, () => {
                NEARBY_DATA.forEach(stop => {
                    $('#nearbyList').append(stop.html);
                    document.getElementById('nearby_' + stop.stop_id).onclick = () => {
                        SELECTED_NEARBY_STOP = stop;
                        return true;//still go to the next page
                    }

                })
            });
        },

};

var ptv_html_util = {//<!--href="contents/PTV/select_route.html"-->
    parseNearbyStopHtml:
        function ({stop_name, stop_suburb, route_type, stop_id}) {
            return `<li class=\"li-has-multiline li-has-thumb-left\">\
            <a href=\"contents/PTV/select_route.html\" id=\"nearby_` + stop_id + `\"><div class=\"ui-marquee marquee\">${stop_name}</div>\
                    <span class=\"ui-li-sub-text li-text-sub\">in</span>\
					<span class=\"ui-li-sub-text li-text-sub\">${stop_suburb}</span>\
					<img src=\"../../../css/images/PTV/` + ROUTE_TYPES[route_type].img + `\" class=\"ui-li-thumb-left\">\
			</a>\
            </li>`;
        },
    parseRouteHtml:
        function(route){
            let routeName=ROUTE_NAMES[route.route_id];

        }
};
