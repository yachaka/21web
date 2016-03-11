
var React = require('react');

var AnonymousUser = React.createClass({
    displayName: 'AnonymousUser',
    render() {
        return (
            <div id="loggedUser">
                <p className="username">
                    <br/>
                   Vous êtes anonyme.
                </p>

                <div className="actions">
                    <div className="action">
                        <a href="#">Se connecter</a>
                    </div>

                    <div className="action">
                        <a href="#">Inscription</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = AnonymousUser;