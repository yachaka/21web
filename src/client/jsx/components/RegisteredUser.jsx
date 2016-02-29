
var React = require('react');

var RegisteredUser = React.createClass({
    displayName: 'RegisteredUser',
    render() {
        return (
            <div id="loggedUser">
                <div className="avatar"><img src="https://pbs.twimg.com/profile_images/378800000767456340/d2013134969a6586afd0e9eab6b0449b.jpeg" /></div>
                <p className="username">
                    <span className="secondary">Logged in as</span><br/>
                    anonymous
                </p>
            </div>
        );
    }
});

module.exports = RegisteredUser;