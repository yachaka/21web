
var React = require('react')

	, Creator = require('../actions/Creator')
	, k = require('../k');

var LoginRegisterScreen = React.createClass({
    render() {
        return (
            <div id="loginRegisterScreen" className="screen grey">
            	<p className="title">
            		Welcome on<br/>
            		<img src="/img/locate.png" height="62"/>
            	</p>

            	<p className="action">
            		<a href="#" onClick={Creator.goToScreen.bind(Creator, k.Screens.GPS)}>Go anonymous</a>
            	</p>

            	<p className="or">or</p>

            	<p className="action">
            		<a href="#">Log in</a>
            	</p>

            </div>
        );
    }
});

module.exports = LoginRegisterScreen;