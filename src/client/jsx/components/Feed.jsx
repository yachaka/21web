
var Dispatcher = require('../Dispatcher')
	, DispatcherEventsSubscriber = require('../mixins/EventsSubscriberMixin')(Dispatcher)
	, ActionsTypes = require('../actions');

var React = window.React = require('react')
	, ReactDOM = window.ReactDOM = require('react-dom');

var Post = require('./Post.jsx');

var Feed = React.createClass({
	mixins: [DispatcherEventsSubscriber],

	getInitialState() {
	    return {
	        postActionsCircleShown: true,
	        postActionsCircleCoords: null,

	        posts: []
	    };
	},

	componentDidMount() {
		this.subscribeToEvent(ActionsTypes.NEW_POSTS, function (posts) {
			console.log('in setState', posts);
			this.setState({
				posts: this.state.posts.concat(posts)
			});
		}.bind(this));
	},

	sharePost(e) {
		var app = document.getElementById('app');
		console.log(app.offsetLef);
		this.setState({
			postActionsCircleCoords: [e.pageX - app.offsetLeft - 48, e.pageY - app.offsetTop - 48]
		});
	},

	render() {
		// var button = this.state.postActionsCircleShown ? <PostActionsCircle coords={this.state.postActionsCircleCoords} /> : null;
		var posts = this.state.posts.map(function (post) {
			return <Post data={post}/>;
		});
		return (
			<div id="feed">
				{posts}
			</div>
		);
	}

});

module.exports = Feed;