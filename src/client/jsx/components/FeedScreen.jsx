
var React = require('react')
	, ActionsType = require('../actions')
    , AppStateCreator = require('../actions/NavigationCreator')
    , Creator = require('../actions/Creator')

    , Screen = require('./common/Screen.jsx')
    , ShareStepOne = require('./modals/ShareStepOne.jsx')
    , ShareStepTwo = require('./modals/ShareStepTwo.jsx');

import ConnectedFeed from './Feed.jsx'

let FeedScreen = () => (
    <div id="feedScreen" className="screen">
        <ConnectedFeed/>

        <div className="row">
            <div className="col-xs-12">
	            <button className="startShare" onClick={null}>Localisez un post</button>
            </div>
        </div>
    </div>
);

module.exports = FeedScreen;