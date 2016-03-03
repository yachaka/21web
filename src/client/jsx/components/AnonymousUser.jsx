
var React = require('react');

var AnonymousUser = React.createClass({
    displayName: 'AnonymousUser',
    render() {
        return (
            <div id="loggedUser">
                <p className="username">
                    Totally<br/>
                    anonymous
                </p>
            </div>
        );
    }
});

module.exports = AnonymousUser;