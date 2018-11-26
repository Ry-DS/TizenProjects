const ROUTE_TYPES =
    [{name: 'Train', img: 'ptv_train.png'}
        , {name: 'Tram', img: 'ptv_tram.png'}
        , {name: 'Bus', img: 'ptv_bus.png'}
        , {name: 'VLine', img: 'ptv_regtrain.png'}
        , {name: 'Night Bus', img: 'ptv_regbus.png'}];

var NEARBY_DATA = [];
var ROUTE_NAMES = [];
var DIRECTION_NAMES = [];//mapped to routes
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
                    $('#'+id).append(stop.html);
                    document.getElementById('nearby_' + stop.stop_id).onclick = () => {
                        SELECTED_NEARBY_STOP = stop;
                        setTimeout(()=>{
                        	listEdit.edit('routeList',()=>{});
                        	setTimeout(()=>{ptv.populateRoutes(stop);},250);
                        
                        },250);
                        
                        return true;//still go to the next page
                    }

                })
            });
        },
    renderRoutes:
        function(id){
        listEdit.edit(id,()=>{
            SELECTED_NEARBY_STOP.latest_routes.forEach(rt=>{
                $('#'+id).append(rt.html);
            });});
        },
    findDirection:
        function(route_id,direction_id){
            let direction=DIRECTION_NAMES[route_id];
            for(dir of direction.directions){
                if(dir.direction_id===direction_id)
                    return dir;
            }
            return null;
        }

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
            let routeName=ROUTE_NAMES[route.route_id].route.route_name;
            let routeNumber=ROUTE_NAMES[route.route_id].route.route_number;
            let departureTime=new Date(route.estimated_departure_utc===null?route.scheduled_departure_utc:route.estimated_departure_utc);
            let departureTimeString=departureTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });


            return `<li class=\"li-has-multiline li-has-thumb-left\">\
            <a href=\"contents/PTV/select_route.html\" id=\"route_` + route.route_id + `\"><div class=\"ui-marquee marquee\">${routeName}</div>\
                    <span class=\"ui-li-sub-text li-text-sub\">Next at: ${departureTimeString}</span>\
					<span class=\"ui-li-sub-text li-text-sub marquee\">Towards `+ptv_data_util.findDirection(route.route_id,route.direction_id).direction_name+`</span>\
					<span class=\"ui-li-sub-text li-text-sub\">`+(routeNumber?`Route ${routeNumber}`:``)+`</span>\
					<img src=\"../../../css/images/PTV/` + ROUTE_TYPES[SELECTED_NEARBY_STOP.route_type].img + `\" class=\"ui-li-thumb-left\">\
			</a>\
            </li>`;


        }
};
