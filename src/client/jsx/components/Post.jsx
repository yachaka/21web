
var React = require('react');

var postTextParser = require('../helpers/PostTextParser')
	, classNames = require('classnames');

var FluxContainerMixin = require('flux/utils').Mixin
	, UserStore = require('../stores/UserStore')
	, AppStateStore = require('../stores/AppStateStore');

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getHost(url) {
	var pattern = /(https?:\/\/)(www\.)?([a-zA-Z0-9\.]+)(\/(.*))?/;
	return url.replace(pattern, "$3");
}

function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}

/*
<div className="image content main">
					<img src="/img/skate.jpg"/>
				</div>
				<p className="comments">24 comments</p>
				*/
var Post = React.createClass({
    mixins: [FluxContainerMixin([UserStore, AppStateStore])],
    statics: {
        calculateState: function (prevState) {
            return {
                loggedUser: UserStore.getLoggedUser(),
                userLocation: AppStateStore.location
            };
        }
    },

    render() {
    	var className = classNames('post row', {'my-post': this.state.loggedUser.id == this.props.data.user_id, 'pending': this.props.data.pending, 'bounceIn': this.props.data.justShared, 'odd': this.props.odd});

        return (
            <div className={className}>
            	<div className="inner col-xs-12">
					<p className="time">il y a 9 heures</p>

					<p className="location">Situé à <img src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-23-32.png"/> {Math.ceil(distance(this.state.userLocation.coords.latitude, this.state.userLocation.coords.longitude, this.props.data.lat, this.props.data.lng, 'K'))} km</p>
					<p className="title">
						<a href={this.props.data.url}>{this.props.data.text}</a>
					</p>
					<p className="from-and-shared">
						{getHost(this.props.data.url)} partagé par <span className="shared-username">{this.props.data.user ? this.props.data.user.username : '[utilisateur supprimé]'}</span><img className="avatar" src="https://pbs.twimg.com/profile_images/378800000767456340/d2013134969a6586afd0e9eab6b0449b.jpeg" />
					</p>
				</div>			
			</div>
        );
    }
});

/*<img src="https://pbs.twimg.com/profile_images/378800000767456340/d2013134969a6586afd0e9eab6b0449b.jpeg" />*/

module.exports = Post;