$( document ).ready(function() {
                var map; // map object
                var geocoder; // geolocation
                var allmarkers = []; // holds all markers

                var latitude;
                var longitude;

                /*geoPosition javascript start*/
                function initializeGeo(){
                    if(geoPosition.init()){  // Geolocation Initialisation
                        geoPosition.getCurrentPosition(success_callback,error_callback,{enableHighAccuracy:true});
                    }
                    else{
                        // You cannot use Geolocation in this device
                        alert("Dafuq!? Can't use geolocation services for this thingy!! :(");
                    }
                    //geoPositionSimulator.init(); 
                }

                // p : geolocation object
                function success_callback(p){
                    // p.latitude : latitude value
                    // p.longitude : longitude value
                    
                    //alert("Found you at latitude " + p.coords.latitude +
                    //    ", longitude " + p.coords.longitude);
                    
                    //getting current user location
                    latitude = p.coords.latitude;
                    longitude = p.coords.longitude;
                    
                    //I guess we call it in here?
                    $( "#address" ).val(latitude + " ," + longitude);
                }

                function error_callback(p){
                    // p.message : error message
                    
                    alert("DAFUQ!? Y U NO SHARE GEOLOCATION!? :(((((");
                }
                /*geoPosition javascript end*/




                function initialize() {
                    geocoder = new google.maps.Geocoder();
                    var latlng = new google.maps.LatLng(37.779649, - 122.420552);
                    var mapOptions = {
                        //center: new google.maps.LatLng(37.779649, -122.420552),
                        zoom: 8,
                        center: latlng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    map = new google.maps.Map(document.getElementById("map_canvas"),
                        mapOptions);
                }

                function codeAddress() {

                    var locationComment = document.getElementById('locationComment').value;

                    var contentString = '<div id="mapContent">' + 
                                            '<div id="siteNotice">' + '</div>' + 
                                            '<h2 id="firstHeading" class="firstHeading">' + document.getElementById('address').value + '</h2>' + 
                                            '<div id="bodyContent">' + '<p>' + locationComment + '</p>' + '</div>' + 
                                        '</div>';
    
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    var address = document.getElementById('address').value;
                    
                    geocoder.geocode({
                        'address': address}, function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                map.setCenter(results[0].geometry.location);
                                
                                var marker = new google.maps.Marker({
                                    map: map,
                                    position: results[0].geometry.location
                                });
                                
                                //marker infobox       				
                                google.maps.event.addListener(marker, 'click', function() {
                                    infowindow.open(map, marker);
                                });
                                
                                //adding markers to marker array
                                addMarker(marker);
                            }
                            else {
                                alert("Geocode was not successful for the following reason: " + status);
                            }
                        });
                }   
                
                // Sets the map on all markers in the array.
                function setAllMap(map) {
                    for (var i = 0; i < allmarkers.length; i++) {
                        allmarkers[i].setMap(map);
                    }
                }
                
                // Removes the overlays from the map, but keeps them in the array.
                function clearOverlays() {
                    setAllMap(null);
                }
                
                // Shows any overlays currently in the array.
                function showOverlays() {
                    setAllMap(map);
                }
                // push marker to the array.
                function addMarker(marker) {
                    allmarkers.push(marker);
                }
                // push marker to the array.
                function deleteAllMarkers() {
                    clearOverlays();
                    allmarkers = [];
                }

                //we call the functions
                initialize();
                //element marker, with on click function
                $( "#userLocation").on( "click", function(event){
                    initializeGeo(); 
                    
                });
                $( "#marker" ).on( "click", function(event){
                    codeAddress();
                });
                $( "#showMarkers" ).on( "click", function(event){
                    showOverlays();
                });
                $( "#clearMarkers" ).on( "click", function(event){
                    clearOverlays();
                });
                $( "#deleteAllMarkers" ).on( "click", function(event){
                    deleteAllMarkers();
                });
                
                
            });//end of jquery