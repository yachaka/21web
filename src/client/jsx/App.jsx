
var reqwest = require('reqwest');

var React = require('react')
	, ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Feed = require('./components/Feed.jsx')
	, PostActionsCircle = require('./components/PostActionsCircle.jsx')
    , ShareNewPost = require('./components/ShareNewPost.jsx')
    , LocationChooser = require('./components/LocationChooser.jsx')
    , AnonymousUser = require('./components/AnonymousUser.jsx')
	, RegisteredUser = require('./components/RegisteredUser.jsx');

var Dispatcher = require('./Dispatcher')
    , FluxContainerMixin = require('flux/utils').Mixin

    , ActionsType = require('./actions')
    , Creator = require('./actions/Creator')

    , PostsStore = require('./stores/PostsStore')
    , SharingPostStore = require('./stores/SharingPostStore');
/*
<div id="enterDescriptionScreen" className="screen">
                            <div className="user-info">
                                <div className="avatar"><img src="https://pbs.twimg.com/profile_images/378800000767456340/d2013134969a6586afd0e9eab6b0449b.jpeg" /></div>
                                <p className="username">yachaka</p>
                            </div>
                            <textarea placeholder="Paste the URL of the post you want to locate"></textarea>

                            <button className="next">Next</button>
                        </div>
                        */
var App = React.createClass({
    mixins: [FluxContainerMixin([PostsStore, SharingPostStore])],
    statics: {
        calculateState: function (prevState) {
            return {
                posts: PostsStore.getAll(),
                sharingPostScreenDisplayed: SharingPostStore.whichShareStep(),
                sharingData: SharingPostStore.getShareData()
            };
        }
    },

    componentDidMount() {
        Creator.fetchPosts();
    },

    render() {
        var sharingPostScreenDisplayed = null;
        if (this.state.sharingPostScreenDisplayed == 1)
            sharingPostScreenDisplayed = <ShareNewPost key="step1"/>;
        else if (this.state.sharingPostScreenDisplayed == 2)
            sharingPostScreenDisplayed = <LocationChooser postData={this.state.sharingData} key="step2"/>;

        var loggedUser = this.props.user.newUser ? <AnonymousUser user={this.props.user}/> : <RegisteredUser user={this.props.user}/>;

        return (
            <div id="app">

                {loggedUser}

     			<div id="top"></div>

                <div id="content">
                    <ReactCSSTransitionGroup component="div" transitionName="screen" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={250}>
                        {sharingPostScreenDisplayed}
                    </ReactCSSTransitionGroup>

    				<Feed userSharingNewPost={this.state.sharingPostScreenDisplayed > 0}/>

                    <button className="startShare" onClick={Creator.goToSharePostStep1.bind(Creator)}>Share a post</button>
                </div>
			</div>
		);
    }
});

window.App = App;