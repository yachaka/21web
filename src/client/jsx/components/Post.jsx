
var React = require('react');

var postTextParser = require('../helpers/PostTextParser');

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

var Post = React.createClass({
    displayName: 'Post',
    render() {
        return (
            <div className="post">
				<div className="top">
					<div className="avatar"><img src="https://pbs.twimg.com/profile_images/378800000767456340/d2013134969a6586afd0e9eab6b0449b.jpeg" /></div>
					<p className="time">9 hours ago</p>
				</div>
				<p className="text content first" dangerouslySetInnerHTML={{__html: postTextParser(htmlEntities(this.props.data.text))}}>
				</p>
				<div className="image content main">
					<img src="/img/skate.jpg"/>
				</div>

				<p className="comments">24 comments</p>
				<p className="location">Located <img src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-23-32.png"/> 4 km away</p>
			</div>
        );
    }
});

module.exports = Post;