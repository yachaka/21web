
var Dispatcher = require('../Dispatcher')
	, ActionsType = require('../actions');

import { connect } from 'react-redux';

var React = require('react')
	, ReactDOM = require('react-dom');

var Post = require('./Post.jsx');

let Feed = ({posts}) => (
	<div id="feed">
		{ posts.map((post, i) => <Post key={post.id} odd={i % 2} data={post}/>) }
	</div>
);

export default connect(
	state => ({
		posts: state.posts || []
	})
)(Feed);