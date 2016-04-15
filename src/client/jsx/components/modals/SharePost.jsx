
var React = require('react')
    , Modal = require('../common/Modal.jsx')

import ReactDOM from 'react-dom'
import debounce from 'debounce'
import { GoogleMapLoader, GoogleMap } from 'react-google-maps'
import classNames from 'classnames'
import { connect } from 'react-redux'

import request from '../../request'

import { sharePost } from '../../actions'

function isUrl(url) {
    if (url.match(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}(\/\S*)?$/))
        return true;
    return false;
}

function normalizeUrl(url) {
    if (url.substr(0, 8) != 'https://' && url.substr(0, 7) != 'http://')
        return 'http://'+url;
    return url;
}

class SharePost extends React.Component {

    state = {
        url: '',
        coords: null,
        preview: null,

        fetching: false
    }

    constructor(props) {
        super(props)
        this.debouncedOnChange = debounce((v) => {
            this.setState({
                url: v
            });
        }, 1000);
        this.onChangeValue = (e) => {
            this.debouncedOnChange(e.target.value);
        };

        /* Binds */
        this.mapCenterChanged = this.mapCenterChanged.bind(this);
        this.share = this.share.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.url != this.state.url && isUrl(this.state.url))
            this.fetchPreview();

        if (prevState.preview != this.state.preview && this.state.preview)
            window.iframely.load(ReactDOM.findDOMNode(this.refs.preview).firstChild);
    }

    fetchPreview() {
        this.setState({
            fetching: true
        });

        request
            .get('http://iframe.ly/api/iframely?url='+ encodeURI(normalizeUrl(this.state.url)) + '&key=e788d1ee1f6a783106da3dbaa5b1f2f6')
            .then((res) => {
                this.setState({
                    preview: res.body,
                    fetching: false
                });
            });
    }

    mapCenterChanged() {
        let c = this.refs.map.getCenter();

        this.setState({
            coords: {
                lat: c.lat(),
                lng: c.lng()
            }
        });
    }

    share() {
        this.props.share({
            url: this.state.url,
            title: this.refs.title.value,
            lat: this.state.coords.lat,
            lng: this.state.coords.lng
        });
    }

    componentDidMount() {
        // GoogleMapsLoader.LIBRAIRIES = ['geometry'];
        // GoogleMapsLoader.load((google) => {
        //     var center = {
        //         lat: this.state.location.coords.latitude,
        //         lng: this.state.location.coords.longitude
        //     };
        //     var map = this.map = new google.maps.Map(this.refs.map, {
        //         center: center,
        //         zoom: 14,
        //         mapTypeControl: false,
        //         styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
        //     });

        //     var circle = new google.maps.Circle({
        //       strokeColor: '#FF0000',
        //       strokeOpacity: 0.8,
        //       strokeWeight: 2,
        //       fillColor: '#FF0000',
        //       fillOpacity: 0.35,
        //       map: map,
        //       center: center,
        //       radius: 65
        //     });
        //     var allowedBounds = circle.getBounds();
        //     var lastValidCenter = map.getCenter();

        //     var geocoder = new google.maps.Geocoder;

        //     // map.addListener('dragend', function () {
        //     //  console.log('-- Dragging end, reverse geocoding starting --');
        //     //  geocoder.geocode({location: map.getCenter(), language: 'fr'}, function (results, status) {
        //     //      if (status == google.maps.GeocoderStatus.OK) {
        //     //          console.log(results);
        //     //      } else {
        //     //          console.error('Failed: ', status);
        //     //      }
        //     //  });
        //     // });

        //     map.addListener('center_changed', function () {
        //         if (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(center.lat, center.lng), map.getCenter()) <= 5500) {
        //             lastValidCenter = map.getCenter();
        //             return false; 
        //         }

        //         map.panTo(lastValidCenter);
        //     });
        //     console.log('okk')
        // });
    }

    preventEnter(event) {
        if (event.keyCode == 13)
            event.preventDefault();
    }

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
                    <div className="col-md-15 col-xs-23 col-xs-offset-1">
                        <input className="classic url" type="text" placeholder="Collez l'adresse web du post" onChange={this.onChangeValue}/>
                        <img className={classNames('spinner', {active: this.state.fetching})} src="/img/spinner.gif" alt="Chargement..."/>
                    </div>
                </div>

                <div className={classNames('part-2', {active: this.state.preview != null})}>
                    {/*******
                    *    Preview 
                    **/}
                    {this.state.preview ?
                        <div className="row picker-preview">
                            <div ref="preview" className="col-xs-23 col-xs-offset-1" style={{maxWidth: '450px'}} dangerouslySetInnerHTML={{__html: this.state.preview.html}}>
                            </div>
                        </div>
                        : null}

                    {/*******
                    *    Titre 
                    **/}
                    <div className="row">
                        <div className="col-md-15 col-xs-23 col-xs-offset-1">
                            <textarea ref="title" className="classic" placeholder="Titre"></textarea>
                        </div>
                    </div>
                    
                    {/*******
                    *    Map 
                    **/}
                    <div className="row">
                        <div className="col-md-15 col-xs-23 col-xs-offset-1" style={{height: '340px'}}>
                            <GoogleMapLoader
                                containerElement={
                                    <div
                                        style={{
                                            height: "100%"
                                        }}
                                    />
                                }
                                googleMapElement={
                                    <GoogleMap
                                        ref="map"
                                        defaultZoom={14}
                                        defaultCenter={{lat: 48.8871464, lng: 2.2990585}}
                                        onCenterChanged={this.mapCenterChanged}
                                        >
                                    </GoogleMap>
                                }
                                />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-23 col-xs-offset-1">
                            <button onClick={this.share}>Share</button>
                        </div>
                    </div>
                </div>

            </Modal>
        );
    }
}

/*
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
                */
let ConnectedSharePost = connect(
    null,
    {
        share: sharePost
    }
)(SharePost);

module.exports = () => <ConnectedSharePost key="sharePostModal"/>;