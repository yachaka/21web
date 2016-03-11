
var React = require('react')
	, reqwest = require('reqwest')

	, Dispatcher = require('../../Dispatcher')
	, ActionsTypes = require('../../actions');

var Login = React.createClass({
    displayName: 'Login',

    logIn() {

    	reqwest({
    		url: '/login',
    		method: 'post',
    		data: {username: this.refs.username.value, password: this.refs.password.value},
    		type: 'json'
    	})
    	.then(function (json) {
    		console.log('Json!', json);
    		if (json.success)
    			Dispatcher.dispatch({
    				type: ActionsTypes('USER_LOGGED_IN'),
    				user: json.user
    			});
    	})
    	.fail(function (err, msg) {
    		console.log(err, msg);
    	});

    },

    render() {
        return (
            <div id="loginModal" className="modal full-width full-height grey">
            	<div className="box">
            		<h3>Connexion</h3>

            		<label>Identifiant</label>
            		<input ref="username" type="text"/>
            		<label>Pass</label>
            		<input ref="password" type="password"/>

            		<button onClick={this.logIn}>Connexion</button>
            	</div>
            </div>
        );
    }
});

module.exports = Login;