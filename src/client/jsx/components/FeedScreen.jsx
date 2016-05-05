
var React = require('react')
	, ActionsType = require('../actions')
    , AppStateCreator = require('../actions/NavigationCreator')
    , Creator = require('../actions/Creator')

    , Screen = require('./common/Screen.jsx');

import { connect } from 'react-redux'
import { setModal } from '../actions'

import ConnectedFeed from './Feed.jsx'
import SharePost from './modals/SharePost.jsx'

let FeedScreen = ({locateAPost}) => (
    <div id="feedScreen" className="screen">
        <ConnectedFeed/>

        <div className="row">
            <div className="col-xs-12">
	            <a id="locateButton" onClick={locateAPost}>Localisez un post</a>
            </div>
        </div>
    </div>
);
module.exports.FeedScreen = FeedScreen;

let _setShareModal = () => setModal(<SharePost/>);
export default connect(
    null,
    {
        locateAPost: _setShareModal
    }
)(FeedScreen);