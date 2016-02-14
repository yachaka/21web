
var Dispatcher = require('./Dispatcher');

var React = window.React = require('react')
	, ReactDOM = window.ReactDOM = require('react-dom');

var PostActionsCircle = require('./components/PostActionsCircle.jsx');


window.App = React.createClass({

	getInitialState() {
	    return {
	        postActionsCircleShown: true  
	    };
	},

	render() {
		var button = this.state.postActionsCircleShown ? <PostActionsCircle/> : null;

		return (
			<div id="app">
				<div className="post">
					<div className="top">
						<div className="avatar"><img src="https://pbs.twimg.com/profile_images/378800000767456340/d2013134969a6586afd0e9eab6b0449b.jpeg" /></div>
						<p className="time">9 hours ago</p>
					</div>
					<p className="text content first">
						Really cool spot
					</p>
					<div className="image content main">
						<img src="dist/img/skate.jpg"/>
					</div>

					<p className="comments">24 comments</p>
					<p className="location">Located <img src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-23-32.png"/> 4 km away</p>
				</div>

				<div className="post">
					<div className="top">
						<div className="avatar"><img src="https://pbs.twimg.com/profile_images/378800000767456340/d2013134969a6586afd0e9eab6b0449b.jpeg" /></div>
						<p className="time">9 hours ago</p>
					</div>
					<p className="text content first">
						Really cool spot
					</p>
					<div className="image content main">
						<img src="dist/img/skate.jpg"/>
					</div>

					<p className="comments">24 comments</p>
					<p className="location">Located <img src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-23-32.png"/> 4 km away</p>
				</div>

				<button>Share a post</button>

				{button}
			</div>
		);
	}

});