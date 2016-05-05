
var React = require('react')
	, Creator = require('../actions/Creator')
	
    , k = require('../k');

var GpsScreen = React.createClass({
    statics: {
        calculateState: function (prevState) {
            return {
                // location: k.LocationState('UNKNOWN_ERROR')
                location: {}
            };
        }
    },

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(function (newLocation) {
            Creator.setUserLocation(newLocation);
            // Creator.goToScreen(k.Screens.FEED);
        }, function (error) {
            var newLocation = null;
            switch(error.code) {
                case error.TIMEOUT:
                    newLocation = k.LocationState('TIMEOUT');
                    break;
                case error.PERMISSION_DENIED:
                    newLocation = k.LocationState('DENIED');
                    break;
                case error.POSITION_UNAVAILABLE:
                    newLocation = k.LocationState('UNAVAILABLE');
                    break;
                default:
                    newLocation = k.LocationState('UNKNOWN_ERROR');
                    break;
            }
            Creator.setUserLocation(newLocation);
        });  
    },

    render() {
    	var msg = null;

    	switch (this.state.location) {
    		case k.LocationState('PENDING'):
    			msg = [
                    <img src="/img/pin.png" height="30"/>,
                    'En attente de localisation...'
                ];
    			break;
    		case k.LocationState('TIMEOUT'):
    			msg = 'Délai de connexion dépassé. Êtes-vous toujours connecté à Internet ?';
    			break;
    		case k.LocationState('DENIED'):
    			msg = [
                    'Vous avez refusé l\'accès à votre localisation.',
                    <br/>,
                    <a>Comment puis-je annuler mon choix ?</a>
                ];
    			break;
    		case k.LocationState('UNAVAILABLE'):
    			msg = 'Impossible de récupérer votre position.';
    			break;
    		case k.LocationState('UNKNOWN_ERROR'):
    			msg = 'Une erreur inconnue s\'est produite... On en sait pas plus :/';
    			break;
    	}

        if (typeof this.state.location === 'object' && this.state.location.coords)
            msg = 'Géolocalisé !';

        return (
            <div id="gpsScreen" className="screen">
            	
                <div className="row">
                    <div className="col-xs-23 col-xs-offset-1">
                        <p id="gpsMsg">{msg}</p>
                    </div>
                </div>

            </div>
        );
    }
});

module.exports = GpsScreen;