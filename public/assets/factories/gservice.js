// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($rootScope, $http, LocationService){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};
        googleMapService.clickLat  = 0;
        googleMapService.clickLong = 0;

        // Array of locations obtained from API calls
        var locations = [];

        // Variables we'll use to help us pan to the right spot
        var lastMarker;
        var currentSelectedMarker;

        // User Selected Location (initialize to center of America)
        var selectedLat = 34.052235;
        var selectedLong = -118.243683;

        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Takes three parameters (lat, long, and filtering results)

        googleMapService.refresh = function(latitude, longitude, callback, filteredResults){

            // Clears the holding array of locations
            locations = [];

            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;

            // If filtered results are provided in the refresh() call...
            if (filteredResults){

                // Then convert the filtered results into map points.
                locations = convertToMapPoints(filteredResults);

                // Then, initialize the map -- noting that a filter was used (to mark icons yellow)
                initialize(latitude, longitude, true);
            }

            // If no filter is provided in the refresh() call...
            else {
                var coords = [longitude, latitude]
                // Perform an AJAX call to get all of the records in the db.
                $http.post('/getDeliveries', coords).then(function(response, err){
                console.log(coords)
                console.log('getting deliverires')
                  console.log(response);
                  if(typeof(callback) == 'function'){
                        respArray = [];
                    for (var i = 0; i < response.data.length; i++){
                        respArray.push(response.data[i].obj);
                        console.log(respArray)    
                    }
                    
                    console.log(respArray)
                    callback(respArray)
                    }
                     // console.log(err);
                    // Then convert the results into map points
                    locations = convertToMapPoints(response);
                    initialize(latitude, longitude, false);

                    if (err){
                      console.log(err);
                    };
                  })
            }
        };
        googleMapService.getDisp = function(latitude, longitude, callback, filteredResults){

            // Clears the holding array of locations
            locations = [];

            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;
            var coords = [longitude, latitude]
            // If filtered results are provided in the refresh() call...
            if (filteredResults){
              console.log(filteredResults)
              console.log(locations)
                // Then convert the filtered results into map points.
                locations = convertToMapPoints(filteredResults);

                // Then, initialize the map -- noting that a filter was used (to mark icons yellow)
                initialize(latitude, longitude, true);
            }

            // If no filter is provided in the refresh() call...
            else {

                // Perform an AJAX call to get all of the records in the db.
                $http.post('/getDispensaries', coords).then(function(response, err){
                  console.log('getting dispensaries gservice' + response)
                    // Then convert the results into map points

                    if(typeof(callback) == 'function'){
                    
                        respArray = [];
                        for (var i = 0; i < response.data.length; i++){
                            respArray.push(response.data[i].obj)    
                        }
                        callback(respArray)
                    }

                    locations = convertToMapPoints(response);
                    initialize(latitude, longitude, false);

                    if (err){
                      console.log(err);
                    };
                  })
            }
        };
        googleMapService.getDocs = function(latitude, longitude, callback, filteredResults){

            // Clears the holding array of locations
            locations = [];

            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = latitude;
            selectedLong = longitude;
            var coords = [longitude, latitude]
            // If filtered results are provided in the refresh() call...
            if (filteredResults){
              console.log(filteredResults)
              console.log(locations)
                // Then convert the filtered results into map points.
                locations = convertToMapPoints(filteredResults);

                // Then, initialize the map -- noting that a filter was used (to mark icons yellow)
                initialize(latitude, longitude, true);
            }

            // If no filter is provided in the refresh() call...
            else {

                // Perform an AJAX call to get all of the records in the db.
                $http.post('/getDoctors', coords).then(function(response, err){
                  console.log('getting doctors gservice' + response)
                    // Then convert the results into map points

                    if(typeof(callback) == 'function'){
                    
                        respArray = [];
                        for (var i = 0; i < response.data.length; i++){
                            respArray.push(response.data[i].obj)    
                        }
                    
                        callback(respArray)
                    }


                    locations = convertToMapPoints(response);
                    initialize(latitude, longitude, false);

                    if (err){
                      console.log(err);
                    };
                  })
            }
        };

        // Private Inner Functions
        // --------------------------------------------------------------

        // Convert a JSON of users into map points
        var convertToMapPoints = function(response, err){
            console.log(response)
            console.log(response.data);
            // Clear the locations holder
            var locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.data.length; i++) {


                var business = response.data[i].obj;
                console.log(business);
              switch(business.type){
                case "Delivery":
                  var  contentString = '<p><b>name</b>: ' + business.name + '<br><b>email</b>: ' + business.email + '<br>' + "<a href=\"#/business/"+ business._id + "\"> Visit </a> ";
                  break
                case "Doctor":
                  var  contentString = '<p><b>name</b>: ' + business.name + '<br><b>email</b>: ' + business.email + '<br>' + "<a href=\"#/business/"+ business._id + "\"> Visit </a> ";
                  break
                case "Dispensary":
                  var  contentString = '<p><b>name</b>: ' + business.name + '<br><b>email</b>: ' + business.email + '<br>' + "<a href=\"#/business/"+ business._id + "\"> Visit </a> ";
                  break
              }

                try {
                   // Converts each of the JSON records into Google Maps Location format (Note Lat, Lng format).
                // for business.location in business {
                //     console.log('these are the locations')
                //     console.log(location);
                // }
                      locations.push(new Location(
                        // console.log()
                        new google.maps.LatLng(business.location[1], business.location[0]),
                        new google.maps.InfoWindow({
                            content: contentString,
                            maxWidth: 320
                        }),
                        business.name,
                        business.email
                    ))
                    console.log('theres are the locations')
                        
                    // locations.push(new Location(
                    //     // console.log()

                    //     new google.maps.LatLng(business.location[1], business.location[0]),
                    //     new google.maps.InfoWindow({
                    //         content: contentString,
                    //         maxWidth: 320
                    //     }),
                    //     business.name,
                    //     business.email
                    // ))
                console.log(locations)
                }
                catch(err){
                    // console.log(err)
                    console.log("Couldn't convert point")
                }

            }
            // location is now an array populated with records in Google Maps format
            return locations;
        };

        // Constructor for generic location
        var Location = function(latlon, message, link){
            this.latlon = latlon;
            this.message = message;
            this.link = link;
        };

        // Initializes the map
        var initialize = function(latitude, longitude, filter) {

            // Uses the selected lat, long as starting point
            var myLatLng = {lat: selectedLat, lng: selectedLong};

            // If map has not been created...
            if (!map){

                // Create a new map and place in the index.html page
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: myLatLng,
                    minZoom:12
                });
            }

            // If a filter was used set the icons yellow, otherwise blue
            if(filter){
                icon = "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
            }
            else{
                icon = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
            }

            // Loop through each location in the array and place a marker
            locations.forEach(function(n, i){
               var marker = new google.maps.Marker({
                   position: n.latlon,
                   map: map,
                   title: "Big Map",
                   icon: icon,
               });

                // For each marker created, add a listener that checks for clicks
                google.maps.event.addListener(marker, 'click', function(e){

                    // When clicked, open the selected marker's message
                    currentSelectedMarker = n;
                    n.message.open(map, marker);
                });
            });

            // Set initial location as a bouncing red marker
            var initialLocation = new google.maps.LatLng(latitude, longitude);
            var marker = new google.maps.Marker({
                position: initialLocation,
                animation: google.maps.Animation.BOUNCE,
                map: map,
                icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
            // lastMarker = marker;

            // // Function for moving to a selected location
            // map.panTo(new google.maps.LatLng(latitude, longitude));

            // // Clicking on the Map moves the bouncing red marker
            // google.maps.event.addListener(map, 'click', function(e){
            //     var marker = new google.maps.Marker({
            //         position: e.latLng,
            //         animation: google.maps.Animation.BOUNCE,
            //         map: map,
            //         icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            //     });

            //     // When a new spot is selected, delete the old red bouncing marker
            //     // if(lastMarker){
            //     //     lastMarker.setMap(null);
            //     // }

            //     // Create a new red bouncing marker and move to it
            //     // lastMarker = marker;
            //     // map.panTo(marker.position);

            //     // Update Broadcasted Variable (lets the panels know to change their lat, long values)
            //     googleMapService.clickLat = marker.getPosition().lat();
            //     googleMapService.clickLong = marker.getPosition().lng();
            //     $rootScope.$broadcast("clicked");
            // });
        };

        // Refresh the page upon window load. Use the initial latitude and longitude
        // google.maps.event.addDomListener(window, 'load',
        //     googleMapService.refresh(selectedLat, selectedLong));

        return googleMapService;
    });
