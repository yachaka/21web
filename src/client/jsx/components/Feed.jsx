
var Dispatcher = require('../Dispatcher')
	, ActionsType = require('../actions')
    , FluxContainerMixin = require('flux/utils').Mixin

    , PostsStore = require('../stores/PostsStore');

var React = require('react')
	, ReactDOM = require('react-dom');

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

	render() {
		var posts = this.state.posts.map(function (post) {
			return <Post key={post.id} data={post}/>;
		}.bind(this));

		return (
			<div id="feed">
				{posts}
			</div>
		);
	}

});

module.exports = Feed;