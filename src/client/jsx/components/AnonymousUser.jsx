
var React = require('react')
    , FluxContainerMixin = require('flux/utils').Mixin
    
    , NavigationCreator = require('../actions/NavigationCreator')
    , ModalsStore = require('../stores/ModalsStore')
    , LoginModal = require('./modals/Login.jsx')

    , classNames = require('classnames');

var AnonymousUser = React.createClass({

    getInitialState() {
        return {
            showConnectForm: true  
        };
    },
    toggleForm() {
        this.setState({
            showConnectForm: !this.state.showConnectForm
        });
    },

    render() {
        var actions;

        if (this.state.showConnectForm) {
            actions = <div className="actions">
                <div className="action orange">
                    <a href="#" onClick={this.toggleForm}>
                        Annuler
                    </a>
                </div>
                <div className="action blue">
                    <a href="#">Go!</a>
                </div>

                <div className="connect-form">
                    <input type="text" placeholder="Identifiant"/>
                    <input type="password" placeholder="Mot de passe"/>
                    <input type="checkbox"/> Se souvenir de moi
                </div>
            </div>;
        } else {
            actions = <div className="actions">
                <div className="action">
                    <a href="#" onClick={this.toggleForm}>
                        Se connecter
                    </a>
                </div>

                <div className="action">
                    <a href="#">Inscription</a>
                </div>
            </div>;
        }

        return (
            <div id="loggedUser">
                <p className="username">
                    <br/>
                   Vous êtes anonyme.
                </p>

               {actions}
            </div>
        );
    }
});

module.exports = AnonymousUser;