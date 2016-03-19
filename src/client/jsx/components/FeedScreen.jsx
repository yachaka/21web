
var React = require('react')
	, ActionsType = require('../actions')
    , AppStateCreator = require('../actions/NavigationCreator')
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
            <div id="feedScreen" className="screen">
	            <Feed/>

                <div className="row">
                    <div className="col-xs-12">
        	            <button className="startShare" onClick={null}>Localisez un post</button>
                    </div>
                </div>
	        </div>
        );
    }
});

module.exports = FeedScreen;