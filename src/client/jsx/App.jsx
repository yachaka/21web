
var reqwest = require('reqwest');

var React = window.React = require('react')
    , ReactDOM = window.ReactDOM = require('react-dom')
	, ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var PostActionsCircle = require('./components/PostActionsCircle.jsx')
    , AnonymousUser = require('./components/AnonymousUser.jsx')
    , RegisteredUser = require('./components/RegisteredUser.jsx')
    , GpsScreen = require('./components/GpsScreen.jsx')
    , SharePost = require('./components/modals/SharePost.jsx');

import Login from './components/modals/Login.jsx'

import FeedScreen from './components/FeedScreen.jsx'

var Dispatcher = require('./Dispatcher')
    , FluxContainerMixin = require('flux/utils').Mixin

    , ActionsType = require('./actions')
    , Creator = require('./actions/Creator')

    , k = require('./k');

import { Map } from 'immutable';

import Store from './Store'

import { IndexRoute, Router, Route, Link, browserHistory } from 'react-router'
import { connect, Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import { SET_MODAL, setModal, newPosts, logout } from './actions'

// import { combineReducers } from 'redux-immutable'

import DevTools from './DevTools'


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





let history = syncHistoryWithStore(browserHistory, Store);

const App = ({user, openLoginModal, logout, modal, children, params, location}) => {
    let userDOM = user && user.get('id') ? 
            <div id="loggedUser">
                <p className="username">
                    {user.get('username')}
                </p>
                <p className="actions">
                    <a href="javascript:;" onClick={logout}>Se déconnecter</a>
                </p>
            </div> :
            <p>Vous êtes anonyme. <a onClick={openLoginModal}>Login</a></p>;

    let WithRouteModal = modal ?
        React.cloneElement(modal, {params: params, location: location}) :
        modal;
    return (
        <div>
            <DevTools/>
            <div id="header">
                <div id="fixed">
                    <div id="l" className="block">
                        <img src="/img/locate-l.png"/>
                    </div>
                    <div className="user block">
                        {userDOM}
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-4 col-xs-offset-1">
                        <img id="logo" src="/img/locate.png"/>
                    </div>
                    <div className="col-xs-19">
                        {userDOM}
                    </div>
                </div>

                <div className="row">
                    <h1 id="subTitle" className="col-xs-23 col-xs-offset-1">
                        {params.sub}
                    </h1>
                </div>
                
                <div className="row">
                    <p id="headerText" className="col-xs-23 col-xs-offset-1">
                        Bienvenue sur Locate Skate.<br/>
                        Commencez à localiser les posts de skate sur Paris dès maintenant.

                        <br/>
                    </p>
                </div>
            </div>

            <div id="modals">
            {WithRouteModal}</div>
             {/*<ReactCSSTransitionGroup id="modals" component="div" transitionName="modal" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                {WithRouteModal}
            </ReactCSSTransitionGroup>*/}

            {children}
            
        </div>
    );
};

let _setLoginModal = () => setModal(<Login/>);
let ConnectedApp = connect(
    (state, ownProps) => ({
        user: state.user,
        modal: state.modal
    }),
    {
        openLoginModal: _setLoginModal,
        logout: logout
    }
)(App);

class ContainerApp extends React.Component {

    constructor(props) {
        super(props)

        reqwest({
            url: props.params.sub + '/posts',
            type: 'json'
        })
        .then((json) => {
            Store.dispatch(newPosts(json.posts));
        });
    }

    render() {
        return <ConnectedApp {...this.props}/>;
    }
}
// var App = React.createClass({
//     mixins: [FluxContainerMixin([UserStore, AppStateStore])],
//     statics: {
//         calculateState: function (prevState) {
//             return {
//                 user: UserStore.user,
//                 location: UserStore.location,
//                 modal: AppStateStore.modal
//             };
//         }
//     },

//     componentWillMount() {
//     },
//     componentDidMount() {
//         Creator.fetchPosts();
//     },
//     componentDidUpdate(prevProps, prevState) {
//         if (this.state.modal != null)
//             document.body.className = 'modal-active';
//         else
//             document.body.className = '';
//     },

//     render() {
//         var user = this.state.user.anonymous ? 
//             <p>Vous êtes anonyme.</p> :
//             <div id="loggedUser">
//                 <div className="avatar">
//                     <img src="data:image/jpeg;base64,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"/>
//                 </div>
//                 <p className="username">
//                     {this.state.user.username}
//                 </p>
//             </div>;
//         // var loggedUser = <AnonymousUser user={this.state.loggedUser}/>;
//         if (typeof this.state.location === 'object'
//             && typeof this.state.location.coords === 'object'
//             && typeof this.state.location.coords.latitude === 'number'
//             && typeof this.state.location.coords.longitude === 'number')
//             screen = <FeedScreen/>;
//         else
//             screen = <GpsScreen/>;

//         return (
//             <div>
//                 <div id="header">
//                     <div id="fixed">
//                         <div id="l" className="block">
//                             <img src="/img/locate-l.png"/>
//                         </div>
//                         <div className="sub-name block">
//                             {this.props.params.sub}
//                         </div>
//                         <div className="user block">
//                             {user}
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="col-xs-4 col-xs-offset-1">
//                             <img id="logo" src="/img/locate.png"/>
//                         </div>
//                         <div className="col-xs-19">
//                             {user}
//                         </div>
//                     </div>

//                     <div className="row">
//                         <h1 id="subTitle" className="col-xs-23 col-xs-offset-1">
//                             {this.props.params.sub}
//                         </h1>
//                     </div>
                    
//                     <div className="row">
//                         <p id="headerText" className="col-xs-23 col-xs-offset-1">
//                             Bienvenue sur Locate Skate.<br/>
//                             Commencez à localiser les posts de skate sur Paris dès maintenant.

//                             <br/>
//                             <a href="javascript:;" onClick={() => this.setState({modal: Login()})}>Login</a>
//                         </p>
//                     </div>
//                 </div>

//                  <ReactCSSTransitionGroup id="modals" component="div" transitionName="modal" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
//                     {this.state.modal}
//                 </ReactCSSTransitionGroup>

//                 {screen}
                
//             </div>
// 		);
//     }
// });
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


ReactDOM.render((
    <Provider store={Store}>
        <Router history={history}>
            <Route path="/:sub" component={ContainerApp}>
                <IndexRoute component={FeedScreen}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));