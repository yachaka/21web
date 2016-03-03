var React = require('react');

var Creator = require('../actions/Creator')
    , ValidateMixin = require('../mixins/ValidateMixin')
    , validate = require('validate.js');


var ShareNewPost = React.createClass({
    mixins: [ValidateMixin(validate)],

    goToStep2() {
        Creator.goToSharePostStep2(this.refs.url.value, this.refs.text.value);
    },

    render() {
        return (
            <div id="enterDescriptionScreen" className="screen">
                <button className="cancel" onClick={Creator.cancelSharePost.bind(Creator)}>Cancel</button>
                <div className="user-info">
                    <div className="avatar"><img src="https://pbs.twimg.com/profile_images/378800000767456340/d2013134969a6586afd0e9eab6b0449b.jpeg" /></div>
                    <p className="username">yachaka</p>
                </div>
                <input ref="url" autoFocus placeholder="URL of the post you want to locate" type="text"/>
                <textarea ref="text" placeholder="What's fun in this post ?"></textarea>

                <button onClick={this.goToStep2} className="next">Next</button>
            </div>
        );
    }
});

module.exports = ShareNewPost;