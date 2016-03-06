
var Dispatcher = require('../Dispatcher')
	, ActionsTypes = require('../actions')
    , FluxContainerMixin = require('flux/utils').Mixin

    , PostsStore = require('../stores/PostsStore');

var React = window.React = require('react')
	, ReactDOM = window.ReactDOM = require('react-dom');

var Post = require('./Post.jsx');

var Feed = React.createClass({
	mixins: [FluxContainerMixin([PostsStore])],
	statics: {
        calculateState: function (prevState) {
            return {
                posts: PostsStore.getAll()
            };
        }
    },
	getInitialState() {
	    return {
	        postActionsCircleShown: true,
	        postActionsCircleCoords: null
	    };
	},


	render() {
		// var button = this.state.postActionsCircleShown ? <PostActionsCircle coords={this.state.postActionsCircleCoords} /> : null;
		var posts = this.state.posts.concat(this.state.posts).concat(this.state.posts);
		var posts = posts.map(function (post) {
			return <Post data={post}/>;
		}.bind(this));

		var overlayActive = this.props.userSharingNewPost == true ? 'active' : '';

		return (
			<div id="feed">
				{posts}
			</div>
		);
	}

});

module.exports = Feed;