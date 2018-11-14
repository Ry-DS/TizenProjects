const ROUTE_TYPES =
    [{name: 'Train', img: 'ptv_train.png'}
        , {name: 'Tram', img: 'ptv_tram.png'}
        , {name: 'Bus', img: 'ptv_bus.png'}
        , {name: 'VLine', img: 'ptv_regtrain.png'}
        , {name: 'Night Bus', img: 'ptv_regbus.png'}];

var NEARBY_DATA = [];

function addStop(stop) {
    stop['html'] = ptv_html_util.parseStopHtml(stop);
    NEARBY_DATA.push(stop);

}

var ptv_html_util = {
    parseStopHtml:
        function ({stop_name, stop_suburb, route_type}) {
            return '<li class=\"li-has-multiline li-has-thumb-left\">\
            <a href=\"contents/PTV/select_route.html\">${stop_name}\
                    <span class=\"ui-li-sub-text li-text-sub\">in</span>\
					<span class=\"ui-li-sub-text li-text-sub\">${stop_suburb}</span>\
					<img src=\"../../../css/images/PTV/' + ROUTE_TYPES[route_type] + '\" class=\"ui-li-thumb-left\">\
			</a>\
            </li>';
        }
};
