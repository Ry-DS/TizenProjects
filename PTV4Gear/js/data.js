const ROUTE_TYPES =
    [{name: 'Train', img: 'ptv_train.png'}
        , {name: 'Tram', img: 'ptv_tram.png'}
        , {name: 'Bus', img: 'ptv_bus.png'}
        , {name: 'VLine', img: 'ptv_regtrain.png'}
        , {name: 'Night Bus', img: 'ptv_regbus.png'}];

var NEARBY_DATA = [];
var SELECTED_NEARBY_STOP;
var ptv_data_util = {
    addNearbyStop:
        function (stop) {
            stop['html'] = ptv_html_util.parseStopHtml(stop);
            NEARBY_DATA.push(stop);

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
    parseStopHtml:
        function ({stop_name, stop_suburb, route_type, stop_id}) {
            return `<li class=\"li-has-multiline li-has-thumb-left\">\
            <a href=\"contents/PTV/select_route.html\" id=\"nearby_` + stop_id + `\">${stop_name}\
                    <span class=\"ui-li-sub-text li-text-sub\">in</span>\
					<span class=\"ui-li-sub-text li-text-sub\">${stop_suburb}</span>\
					<img src=\"../../../css/images/PTV/` + ROUTE_TYPES[route_type] + `\" class=\"ui-li-thumb-left\">\
			</a>\
            </li>`;
        }
};
