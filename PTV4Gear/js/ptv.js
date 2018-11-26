/*(function(){

})();*/

var ptv = {
    accessPtv:
        function (uri, onResult) {
            let auth = {id: 3000927, key: 'd43e73b1-15b5-4a83-87d5-22b1ba13524e'};
            let base = 'http://timetableapi.ptv.vic.gov.au';

            let uriWithId = uri;
            if (uri.includes('?')) {
                uriWithId += '&';
            } else uriWithId += '?';

            uriWithId += 'devid=' + auth.id;

            let signature;

            //start hashing
            let shaObj = new jsSHA("SHA-1", "TEXT");
            shaObj.setHMACKey(auth.key, "TEXT");
            shaObj.update(uriWithId);
            signature = shaObj.getHMAC("HEX");
            //end hashing

            let finalUrl = base + uriWithId + '&signature=' + signature.toUpperCase();
            console.log(finalUrl);

            $.ajax({
                type: "GET",
                url: finalUrl, // Server URL
                success: function (data) {
                    console.log(JSON.stringify(data)); // Server data in String format
                    console.log(data); // Server data in JSON format
                    onResult(data);
                },
                error: function () {
                    onResult();
                }
            });


        },
    populateNearby:
        function ({latitude, longitude}) {
            this.accessPtv(`/v3/stops/location/${latitude},${longitude}?max_results=10`, (data) => {

                this.tryPopulate(data, data => {
                    data.stops.forEach(stop => ptv_data_util.addNearbyStop(stop));
                    ptv_data_util.renderNearbyStops('nearbyList');
                }, data => {
                    return data.stops;
                }, 'nearbyList');


            });
        },
    populateRoutes:
        function (nearbyStop) {
            this.accessPtv(`/v3/departures/route_type/${nearbyStop.route_type}/stop/${nearbyStop.stop_id}`, (data) => {

                nearbyStop.departures = data.departures;
                nearbyStop.latest_routes = [];
                let seenRoutes = [];
                let currentDate = new Date();
                for (let dep of data.departures) {
                    if (seenRoutes.includes(dep.route_id) || new Date(dep.estimated_departure_utc != null ? dep.estimated_departure_utc
                        : dep.scheduled_departure_utc) < currentDate)
                        continue;
                    nearbyStop.latest_routes.push(dep);
                    seenRoutes.push(dep.route_id);

                }
                for(let seen of seenRoutes){
                    if(ROUTE_NAMES[seen]===undefined){
                        this.accessPtv(`/v3/routes/${seen}`,result=>{
                            ROUTE_NAMES[seen]=result;

                        });
                    }
                }
                $(document).ajaxStop(function () {//after all internet calls finished
                    $(this).unbind("ajaxStop");
                    this.tryPopulate(true,()=>{

                    },()=>true,'routeList');

                });


            });
        },
    tryPopulate:
        function (data, onTry, isValid, id) {
            if (data && isValid(data)) {
                onTry(data);
            } else listEdit.edit(id, () => {
                $('#' + id).append("<li>No Internet</li>");
            });
        }


};
