
var React = require('react')
    , FluxContainerMixin = require('flux/utils').Mixin

    , AppStateStore = require('../stores/AppStateStore')
    , k = require('../k');

var GpsScreen = React.createClass({
	mixins: [FluxContainerMixin([AppStateStore])],
    statics: {
        calculateState: function (prevState) {
            return {
                location: AppStateStore.location
            };
        }
    },
    render() {
    	var msg = null;

    	switch (this.state.location) {
    		case k.LocationState.PENDING:
    			msg = 'Waiting for user to accept being located...';
    			break;
    		case k.LocationState.TIMEOUT:
    			msg = 'Timed out';
    			break;
    		case k.LocationState.DENIED:
    			msg = 'User denied access to his location.';
    			break;
    		case k.LocationState.UNAVAILABLE:
    			msg = 'Position unavailable';
    			break;
    		case k.LocationState.UNKNOWN_ERROR:
    			msg = 'Unknow error';
    			break;
    		default:
    			console.log(this.state.location.coords);
    			msg = 'Seems like we got it?'+JSON.stringify(this.state.location.coords);
    			break;
    	}

        return (
            <div id="gpsScreen" className="screen">
            	{msg}

            </div>
        );
    }
});

module.exports = GpsScreen;