
var reqwest = require('reqwest');

var React = require('react')
	, ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var PostActionsCircle = require('./components/PostActionsCircle.jsx')
    , AnonymousUser = require('./components/AnonymousUser.jsx')
    , RegisteredUser = require('./components/RegisteredUser.jsx')
    , GpsScreen = require('./components/GpsScreen.jsx')
	, FeedScreen = require('./components/FeedScreen.jsx');

var Dispatcher = require('./Dispatcher')
    , FluxContainerMixin = require('flux/utils').Mixin

    , ActionsType = require('./actions')
    , Creator = require('./actions/Creator')

    , PostsStore = require('./stores/PostsStore')
    , SharingPostStore = require('./stores/SharingPostStore')
    , UserStore = require('./stores/UserStore')
    , AppStateStore = require('./stores/AppStateStore')
    , k = require('./k');
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
    mixins: [FluxContainerMixin([UserStore, AppStateStore])],
    statics: {
        calculateState: function (prevState) {
            return {
                screen: AppStateStore.whichScreen(),
                loggedUser: UserStore.getLoggedUser()
            };
        }
    },

    componentDidMount() {
        Creator.fetchPosts();

        navigator.geolocation.getCurrentPosition(function (newLocation) {
            Creator.setLocation(newLocation);
            Creator.goToScreen(k.Screens.FEED);
        }, function (error) {
            var newLocation = null;
            switch(error.code) {
                case error.TIMEOUT:
                    newLocation = k.LocationState.TIMEOUT;
                    break;
                case error.PERMISSION_DENIED:
                    newLocation = k.LocationState.DENIED;
                    break;
                case error.POSITION_UNAVAILABLE:
                    newLocation = k.LocationState.UNAVAILABLE;
                    break;
                default:
                    newLocation = k.LocationState.UNKNOWN_ERROR;
                    break;
            }
            Creator.setLocation(newLocation);
        });
    },

    render() {
        var loggedUser = this.state.loggedUser.newUser ? <AnonymousUser user={this.state.loggedUser}/> : <RegisteredUser user={this.state.loggedUser}/>;
        var screen;
        switch (this.state.screen) {
            case k.Screens.GPS:
                screen = <GpsScreen/>;
                break
            case k.Screens.FEED:
                screen = <FeedScreen/>;
        }

        return (
            <div id="app">

                {loggedUser}

                <p id="appTheme">#skate</p>

                <ReactCSSTransitionGroup id="screenWrapper" component="div" transitionName="screen" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={250}>

                    {screen}

                    
                </ReactCSSTransitionGroup>

			</div>
		);
    }
});
/*<div id="feedScreen" className="screen">
                        <div id="top"></div>

                        <div id="blackOverlay" className={this.state.modalDisplayed > 0 ? 'active' : null}></div>
                        <Feed userSharingNewPost={this.state.modalDisplayed > 0}/>

                        <button className="startShare" onClick={Creator.goToSharePostStep1.bind(Creator)}>Share a post</button>

                        <ReactCSSTransitionGroup id="modalWrapper" component="div" transitionName="modal" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={250}>
                            {modalDisplayed}
                        </ReactCSSTransitionGroup>
                    </div>*/
window.App = App;