
var React = require('react')
	, ActionsType = require('../actions')
    , AppStateCreator = require('../actions/AppStateCreator')
    , Creator = require('../actions/Creator')

    , Screen = require('./common/Screen.jsx')
    , Feed = require('./Feed.jsx')
    , ShareStepOne = require('./modals/ShareStepOne.jsx')
    , ShareStepTwo = require('./modals/ShareStepTwo.jsx');

var FeedScreen = React.createClass({

    render() {
    	var modals = {
            shareStepOne: <ShareStepOne key="step1"/>,
            shareStepTwo: <ShareStepTwo postData={{}} key="step2"/>
        };

        return (
            <Screen id="feedScreen" modals={modals}>
	            <div id="top"></div>

	            <div id="blackOverlay"></div>
	            <Feed/>

	            <button className="startShare" onClick={AppStateCreator.setActiveModal.bind(Creator, 'shareStepOne')}>Localisez un post</button>
	        </Screen>
        );
    }
});

module.exports = FeedScreen;