
var reqwest = require('reqwest');

var React = window.React = require('react')
    , ReactDOM = window.ReactDOM = require('react-dom')
	, ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var PostActionsCircle = require('./components/PostActionsCircle.jsx')
    , AnonymousUser = require('./components/AnonymousUser.jsx')
    , RegisteredUser = require('./components/RegisteredUser.jsx')
    , GpsScreen = require('./components/GpsScreen.jsx')
    , FeedScreen = require('./components/FeedScreen.jsx')
    , Login = require('./components/modals/Login.jsx');

var Dispatcher = require('./Dispatcher')
    , FluxContainerMixin = require('flux/utils').Mixin

    , ActionsType = require('./actions')
    , Creator = require('./actions/Creator')

    , PostsStore = require('./stores/PostsStore')
    , UserStore = require('./stores/UserStore')
    , AppStateStore = require('./stores/AppStateStore')
    , ModalsStore = require('./stores/ModalsStore')
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
    mixins: [FluxContainerMixin([UserStore])],
    statics: {
        calculateState: function (prevState) {
            return {
                user: UserStore.user,
                location: UserStore.location,
                modal: null
            };
        }
    },

    componentWillMount() {
    },
    componentDidMount() {
        Creator.fetchPosts();
    },

    render() {
        var loggedUser = this.state.user.anonymous ? <AnonymousUser user={this.state.user}/> : <RegisteredUser user={this.state.user}/>;
        // var loggedUser = <AnonymousUser user={this.state.loggedUser}/>;
        console.log(this.state.location);
        // if (typeof this.state.location === 'object'
        //     && typeof this.state.location.coords === 'object'
        //     && typeof this.state.location.coords.latitude === 'number'
        //     && typeof this.state.location.coords.longitude === 'number')
        //     screen = <FeedScreen/>;
        // else
            screen = <GpsScreen/>;

        return (
            <div>
                <div id="header">
                    <div id="fixed">
                        <div id="l" className="block">
                            <img src="/img/locate-l.png"/>
                        </div>
                        <div id="user" className="block">
                            User
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-23 col-xs-offset-1">
                            <img id="logo" src="/img/locate.png"/>
                        </div>
                    </div>
                    <div className="row">
                        <p id="headerText" className="col-xs-23 col-xs-offset-1">
                            Bienvenue sur Locate Skate.<br/>
                            Commencez à localiser les posts de skate sur Paris dès maintenant.

                            <br/>
                            <a href="javascript:;" onClick={this.setState.bind(this, {modal: <Login/>})}>Login</a>
                        </p>
                    </div>
                </div>

                 <ReactCSSTransitionGroup id="modals" component="div" transitionName="modal" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={250}>
                    {this.state.modal}
                </ReactCSSTransitionGroup>

                {screen}
                
            </div>
		);
    }
});
/*

                <div className="row">
                    <div className="col-xs-12">
                        <p id="appTheme">#skate</p>
                    </div>
                </div>

<div id="feedScreen" className="screen">
                        <div id="top"></div>

                        <div id="blackOverlay" className={this.state.modalDisplayed > 0 ? 'active' : null}></div>
                        <Feed userSharingNewPost={this.state.modalDisplayed > 0}/>

                        <button className="startShare" onClick={Creator.goToSharePostStep1.bind(Creator)}>Share a post</button>

                        <ReactCSSTransitionGroup id="modalWrapper" component="div" transitionName="modal" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={250}>
                            {modalDisplayed}
                        </ReactCSSTransitionGroup>
                    </div>*/
window.App = App;