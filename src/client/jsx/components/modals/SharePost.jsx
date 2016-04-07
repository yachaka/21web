
var React = require('react')
    , Modal = require('../common/Modal.jsx')
    , GoogleMapsLoader = require('google-maps')

    , FluxContainerMixin = require('flux/utils').Mixin
    , UserStore = require('../../stores/UserStore');

var SharePost = React.createClass({
    mixins: [FluxContainerMixin([UserStore])],
    statics: {
        calculateState: function (prevState) {
            return {
                user: UserStore.user,
                location: {
                    coords: {
                        latitude: 30,
                        longitude: 30
                    }
                }
            };
        }
    },

    componentDidMount() {
        GoogleMapsLoader.LIBRAIRIES = ['geometry'];
        GoogleMapsLoader.load((google) => {
            var center = {
                lat: this.state.location.coords.latitude,
                lng: this.state.location.coords.longitude
            };
            var map = this.map = new google.maps.Map(this.refs.map, {
                center: center,
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
              center: center,
              radius: 65
            });
            var allowedBounds = circle.getBounds();
            var lastValidCenter = map.getCenter();

            var geocoder = new google.maps.Geocoder;

            // map.addListener('dragend', function () {
            //  console.log('-- Dragging end, reverse geocoding starting --');
            //  geocoder.geocode({location: map.getCenter(), language: 'fr'}, function (results, status) {
            //      if (status == google.maps.GeocoderStatus.OK) {
            //          console.log(results);
            //      } else {
            //          console.error('Failed: ', status);
            //      }
            //  });
            // });

            map.addListener('center_changed', function () {
                if (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(center.lat, center.lng), map.getCenter()) <= 5500) {
                    lastValidCenter = map.getCenter();
                    return false; 
                }

                map.panTo(lastValidCenter);
            });
            console.log('okk')
        });
    },

    preventEnter(event) {
        if (event.keyCode == 13)
            event.preventDefault();
    },

    render() {
        return (
            <Modal id="sharePostModal">

                <div className="top">
                    <div className="row">
                        <h2 className="col-xs-23 col-xs-offset-1">
                            <span className="red">Par</span>
                            <span className="orange">tage</span>
                            <span className="green">r u</span>
                            <span className="light-blue">n po</span>
                            <span className="deep-blue">st</span>
                        </h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-11 col-xs-offset-1">
                            <input autoFocus ref="url" type="text" placeholder="http://" className="classic"/>
                            <textarea ref="title" type="text" placeholder="Titre" className="classic" onKeyDown={this.preventEnter}></textarea>
                            <div id="map" ref="map"></div>
                    </div>
                    <div className="preview col-md-11 col-xs-offset-1 col-md-offset-1">
                        <div className="top">
                            <p className="username">{this.state.user.username}</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-23 col-xs-offset-1">
                    </div>
                </div>
            </Modal>
        );
    }
});

module.exports = () => <SharePost key="sharePostModal"/>;