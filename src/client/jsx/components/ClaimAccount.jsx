
var React = require('react')
	, reqwest = require('reqwest')
	, Dispatcher = require('../Dispatcher')
	, ActionsType = require('../actions')
	, Modal = require('react-modal')
	, ReCAPTCHA = require('react-google-recaptcha')

    , FluxContainerMixin = require('flux/utils').Mixin
    , UserStore = require('../stores/UserStore');


var ClaimAccount = React.createClass({
	mixins: [FluxContainerMixin([UserStore])],
    statics: {
        calculateState: function (prevState) {
            return {
                claimToken: UserStore.getClaimToken(),
            };
        }
    },
    getInitialState() {
        return {
            modalIsOpen: false  
        };
    },

    _data: {
    	username: null,
    	password: null,
    	recaptcha: null
    },

    test() {
    	reqwest({
            url: '/claim/'+this.state.claimToken.value,
            method: 'post',
            type: 'json',
            data: this._data
        })
        .then(function (json) {
        	console.log('Response', json);
    		Dispatcher.dispatch({
                type: ActionsType('USER_LOGGED_IN'),
                user: json.updatedUser
            });
        })
        .catch(function (err) {
        	console.error(err);
        });

    },
    changeData(key, e) {
    	console.log(this._data[key]);
    	if (this._data[key] === undefined)
    		return;
    	if (e.target)
	    	this._data[key] = e.target.value;
	    else if (typeof e === 'string')
	    	this._data[key] = e;
    },

    render() {

        return (
        	<div className="action">
        		<Modal
        			isOpen={this.state.modalIsOpen}
        			onRequestClose={this.setState.bind(this, {modalIsOpen: false}, null)}
        			>
        			Choose an username and a password in order to claim your account
        			<input type="text" onChange={this.changeData.bind(this, 'username')} placeholder="Username"/>
        			<input type="text" onChange={this.changeData.bind(this, 'password')} placeholder="Password"/>

        			<ReCAPTCHA
        				ref="recaptcha"
        				sitekey="6LfbVBoTAAAAAHAjWLidmJaRFohK7iYxV_q2baGY"
        				onChange={this.changeData.bind(this, 'recaptcha')}
        			/>
        			<button onClick={this.test}>Go</button>
        		</Modal>
	            <a href="#" onClick={this.setState.bind(this, {modalIsOpen: true}, null)}>Claim account</a>
	        </div>
        );
    }
});

module.exports = ClaimAccount;