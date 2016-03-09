
var React = require('react')
    , ClaimAccount = require('./ClaimAccount.jsx');

var RegisteredUser = React.createClass({
    displayName: 'RegisteredUser',
    render() {

        var actions = this.props.user.unclaimed ? <ClaimAccount/> : null;

        return (
            <div id="loggedUser">
                <div className="avatar"><img src="https://pbs.twimg.com/profile_images/378800000767456340/d2013134969a6586afd0e9eab6b0449b.jpeg" /></div>
                <p className="username">
                    <span className="secondary">Logged in as</span><br/>
                    {this.props.user.username}
                </p>

                <div className="actions">
                    {actions}
                </div>
            </div>
        );
    }
});

module.exports = RegisteredUser;