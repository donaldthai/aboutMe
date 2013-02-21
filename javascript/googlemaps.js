$( document ).ready(function() {
                var map;
                var geocoder;
                //var marker;

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

                    var contentString = '<div id="mapContent">' + '<div id="siteNotice">' + '</div>' + '<h2 id="firstHeading" class="firstHeading">' + document.getElementById('address').value + '</h2>' + '<div id="bodyContent">' + '<p>Great city though!</p>' + '</div>' + '</div>';
    
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
                            }
                            else {
                                alert("Geocode was not successful for the following reason: " + status);
                            }
                        });
                }                
                //we call the functino
                initialize();
                
                $( "#marker" ).on( "click", function(event){
                    codeAddress();
                });
                
            });//end of jquery