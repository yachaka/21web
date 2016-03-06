
var React = require('react')
	, ReactCSSTransitionGroup = require('react-addons-css-transition-group')

    , FluxContainerMixin = require('flux/utils').Mixin
	, ActionsType = require('../actions')
    , Creator = require('../actions/Creator')

    , SharingPostStore = require('../stores/SharingPostStore')

    , Feed = require('./Feed.jsx')
    , ShareNewPost = require('./ShareNewPost.jsx')
    , LocationChooser = require('./LocationChooser.jsx');

var FeedScreen = React.createClass({
    mixins: [FluxContainerMixin([SharingPostStore])],
	statics: {
        calculateState: function (prevState) {
            return {
                modalDisplayed: SharingPostStore.whichShareStep(),
                sharingData: SharingPostStore.getShareData()
            };
        }
    },

    render() {
    	var modalDisplayed = null;
        if (this.state.modalDisplayed == 1)
            modalDisplayed = <ShareNewPost key="step1"/>;
        else if (this.state.modalDisplayed == 2)
            modalDisplayed = <LocationChooser postData={this.state.sharingData} key="step2"/>;

        return (
            <div id="feedScreen" className="screen">
	            <div id="top"></div>

	            <div id="blackOverlay" className={this.state.modalDisplayed > 0 ? 'active' : null}></div>
	            <Feed userSharingNewPost={this.state.modalDisplayed > 0}/>

	            <button className="startShare" onClick={Creator.goToSharePostStep1.bind(Creator)}>Share a post</button>

	            <ReactCSSTransitionGroup id="modalWrapper" component="div" transitionName="modal" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={250}>
	                {modalDisplayed}
	            </ReactCSSTransitionGroup>
	        </div>
        );
    }
});

module.exports = FeedScreen;