var React = require('react');

var Creator = require('../actions/Creator');


var ShareNewPost = React.createClass({
    displayName: 'ShareNewPost',
    render() {
        return (
            <div id="enterDescriptionScreen" className="screen">
                <button className="cancel" onClick={Creator.cancelSharePost.bind(Creator)}>Cancel</button>
                <div className="user-info">
                    <div className="avatar"><img src="https://pbs.twimg.com/profile_images/378800000767456340/d2013134969a6586afd0e9eab6b0449b.jpeg" /></div>
                    <p className="username">yachaka</p>
                </div>
                <input autoFocus placeholder="URL of the post you want to locate" type="text"/>
                <textarea placeholder="What's fun in this post ?"></textarea>

                <button onClick={Creator.goToSharePostStep2.bind(Creator)} className="next">Next</button>
            </div>
        );
    }
});

module.exports = ShareNewPost;