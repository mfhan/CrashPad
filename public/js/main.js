var map;

function initialize() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(40.7589609,-73.9841719),
    zoom:12,
    minZoom: 10,
    maxZoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControlOptions: {
      position: google.maps.ZoomControlStyle.DEFAULT
      }
  });

    function addMarker(feature, artist) {
      var marker = new google.maps.Marker({
        position: feature.position,
        icon:  {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6
        },
        map: map
      });

      var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h2 id="firstHeading" class="firstHeading">' + artist.userName + '</h2>'+
      '<div id="bodyContent">'+
      '<p>' + artist.website + '</p>'+
      '<p>Video Link: '+artist.videolink +
       '</p>'+
      '<h3>Support the artist!</h3>'+
      '<img src = "/images/paypal-cards.png">'+
      '</div>'+
      '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
  }

        //   $.ajax({url: '/api/artist'}).done(function(json) {
        //     $.each(json.results, function(i, artist) {
        //         addMarker({
        //             position: new google.maps.LatLng(artist.glat, artist.glong),
        //             type: 'info'
        //         });
        //     });
        // });



        //   var infoWindow = new google.maps.InfoWindow(), marker, i;

        //     for( i = 0; i < markers.length; i++ ) {
        //         var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        //         bounds.extend(position);
        //         marker = new google.maps.Marker({
        //         position: position,
        //         map: map,
        //         title: markers[i][0]
        //     });

        // // Allow each marker to have an info window
        // google.maps.event.addListener(marker, 'click', (function(marker, i) {
        //     return function() {
        //         infoWindow.setContent(infoWindowContent[i][0]);
        //         infoWindow.open(map, marker);
        //     }
        // })(marker, i));


  $.ajax({url: '/api/artist'}).done(function(json) {
      $.each(json.results, function(i, artist) {
          addMarker({
              position: new google.maps.LatLng(artist.glat, artist.glong),
              type: 'info'
          }, artist);
          console.log(artist);
      });
  });

}