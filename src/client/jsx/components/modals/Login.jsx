
var React = require('react')
    , Modal = require('../common/Modal.jsx');

var Login = React.createClass({
    render() {
        return (
            <Modal id="loginModal">
                <div className="row">
                    <h2 className="col-xs-23 col-xs-offset-1">Se connecter</h2>
                </div>

                <div className="row">
                    <div className="col-xs-23 col-xs-offset-1">
                        <input type="text" placeholder="Identifiant"/>
                        <input type="password" placeholder="Password"/>
                        <button>Se connecter</button>
                    </div>
                </div>
            </Modal>
        );
    }
});

module.exports = Login;