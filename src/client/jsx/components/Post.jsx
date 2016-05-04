
var React = require('react');

var postTextParser = require('../helpers/PostTextParser')
	, classNames = require('classnames');

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

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function mixColors(color1, color2, progress) {
	color1 = hexToRgb(color1);
	color2 = hexToRgb(color2);
	var rGap = Math.abs(color1.r - color2.r);
	var gGap = Math.abs(color1.g - color2.g);
	var bGap = Math.abs(color1.b - color2.b);

	var newR = color1.r < color2.r ? color1.r + Math.round(rGap * progress) : color2.r + Math.round(rGap * progress);
	var newG = color1.g < color2.g ? color1.g + Math.round(gGap * progress) : color2.g + Math.round(gGap * progress);
	var newB = color1.b < color2.b ? color1.b + Math.round(bGap * progress) : color2.b + Math.round(bGap * progress);

	return rgbToHex(newR, newG, newB);
}

/*
<div className="image content main">
					<img src="/img/skate.jpg"/>
				</div>
				<p className="comments">24 comments</p>
				*/
var Post = React.createClass({
    getInitialState() {
        return {
            userLocation: {coords: {
            	latitude: 30,
            	longitude: 20
            }}
        };
    },
    componentDidMount() {
        window.iframely.load(this.refs.preview.firstChild); 
    },

    render() {
    	var className = classNames('post row');

    	var distanceN = distance(this.state.userLocation.coords.latitude, this.state.userLocation.coords.longitude, this.props.data.get('lat'), this.props.data.get('lng'), 'K');
    	var progress = distanceN / 8;
    	progress = progress > 1 ? 1 : progress;
    	var color = mixColors('#86247E', '#999999', progress);
        return (
            <div className={className}>
            	<div className="distance col-xs-22 col-xs-offset-1 col-md-2 col-md-offset-1" style={{color: color}}>
            		A {Math.round(distanceN)} km
            	</div>

            	<div className="inner col-xs-22 col-xs-offset-1 col-md-21 col-md-offset-0">
            		<div className="row top">
            			<div className="col-md-12">
							<p className="time"> 9 heures</p>
							<p className="title">
								<a href={this.props.data.get('url')}>{this.props.data.get('title')}</a>
							</p>
							<p className="from-and-shared">
								{getHost(this.props.data.get('url'))} partagé par <span className="shared-username">{this.props.data.get('user') ? this.props.data.get('user').get('username') : '[utilisateur supprimé]'}</span><img className="avatar" src="https://pbs.twimg.com/profile_images/378800000767456340/d2013134969a6586afd0e9eab6b0449b.jpeg" />
							</p>
						</div>
					</div>

					<div className="row preview">
						<div className="col-xs-24 col-md-12">
							<div ref="preview" className="true-preview" dangerouslySetInnerHTML={{__html: /*this.props.data.get('preview').get('html')*/''}}></div>
						</div>

						<a href={this.props.data.get('preview').get('canonical')} className="see-more hidden-xs hidden-sm">
							<span className="caret">►</span>
							<span className="info">
								@{this.props.data.get('preview').get('author')}<br/>
								Voir plus sur {this.props.data.get('preview').get('provider')}
							</span>
						</a>
					</div>

					<div className="row see-more-sm-row visible-xs-block visible-sm-block">
						<a href={this.props.data.get('preview').get('canonical')} className="col-xs-24">
							<span className="caret">►</span>
							<span className="info">
								@{this.props.data.get('preview').get('author')}<br/>
								Voir plus sur {this.props.data.get('preview').get('provider')}
							</span>
						</a>
					</div>
				</div>

			</div>
        );
    }
});

/*<img src="https://pbs.twimg.com/profile_images/378800000767456340/d2013134969a6586afd0e9eab6b0449b.jpeg" />

*/

module.exports = Post;