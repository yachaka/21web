
var React = require('react')
	, GoogleMapsLoader = require('google-maps');

var Creator = require('../actions/Creator');

var LocationChooser = React.createClass({
    displayName: 'LocationChooser',

    componentDidMount() {
    	GoogleMapsLoader.LIBRAIRIES = ['geometry'];
	    GoogleMapsLoader.load(function(google) {
			var map = new google.maps.Map(this.refs.map, {
				center: {lat: -33.8950781, lng: 151.2159195},
				zoom: 14,
				mapTypeControl: false,
				styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
			});

			var circle = new google.maps.Circle({
		      strokeColor: '#FF0000',
		      strokeOpacity: 0.8,
		      strokeWeight: 2,
		      fillColor: '#FF0000',
		      fillOpacity: 0.35,
		      map: map,
		      center: {lat: -33.8950781, lng: 151.2159195},
		      radius: 5500
		    });
		    var allowedBounds = circle.getBounds();
		    var lastValidCenter = map.getCenter();

			var geocoder = new google.maps.Geocoder;

			// map.addListener('dragend', function () {
			// 	console.log('-- Dragging end, reverse geocoding starting --');
			// 	geocoder.geocode({location: map.getCenter(), language: 'fr'}, function (results, status) {
			// 		if (status == google.maps.GeocoderStatus.OK) {
			// 			console.log(results);
			// 		} else {
			// 			console.error('Failed: ', status);
			// 		}
			// 	});
			// });

			map.addListener('center_changed', function () {
				if (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(-33.8950781, 151.2159195), map.getCenter()) <= 5500) {
			        lastValidCenter = map.getCenter();
			        return false; 
			    }

			    map.panTo(lastValidCenter);
			});
		}.bind(this));
	},

    render() {
        return (
            <div id="locateScreen" className="screen fullscreen">
            	<div id="userPostInfos">
		            <button className="cancel" onClick={Creator.cancelSharePost.bind(Creator)}>Cancel</button>
            		<div className="user">
						<div className="avatar"><img src="https://pbs.twimg.com/profile_images/378800000767456340/d2013134969a6586afd0e9eab6b0449b.jpeg" /></div>
						<p className="username">yachaka</p>
					</div>

					<div className="post-text">
						https://www.facebook.com/ this site is so sick lol Ss!!
					</div>
				</div>

            	<div className="marker"></div>
            	<div id="map" ref="map">
            	</div>

            	<button className="share" onClick={Creator.sharePost.bind(Creator)}>Set location</button>
            </div>
        );
    }
});

module.exports = LocationChooser;