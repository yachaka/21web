
var reqwest = require('reqwest');

var React = require('react')
	, ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Feed = require('./components/Feed.jsx')
	, PostActionsCircle = require('./components/PostActionsCircle.jsx')
    , ShareNewPost = require('./components/ShareNewPost.jsx')
	, LocationChooser = require('./components/LocationChooser.jsx');

var Dispatcher = require('./Dispatcher')
    , DispatcherEventsSubscriber = require('./mixins/EventsSubscriberMixin')(Dispatcher)

    , ActionsType = require('./actions')
    , Creator = require('./actions/Creator');

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
window.App = React.createClass({
    displayName: 'App',
    mixins: [DispatcherEventsSubscriber],

    getInitialState() {
        return {
            sharingPost: 0  
        };
    },

    componentDidMount() {
        Creator.fetchPosts();

        this.subscribeToEvent(ActionsType.GO_TO_SHARE_POST_STEP_1, this.wrappedSetState({sharingPost: 1}));
        this.subscribeToEvent(ActionsType.GO_TO_SHARE_POST_STEP_2, this.wrappedSetState({sharingPost: 2}));
        this.subscribeToEvent(ActionsType.SHARE_POST, this.wrappedSetState({sharingPost: 0}));
        this.subscribeToEvent(ActionsType.CANCEL_SHARE_POST, this.wrappedSetState({sharingPost: 0}));
    },

    render() {
        var sharingPostScreen = null;
        if (this.state.sharingPost == 1)
            sharingPostScreen = <ShareNewPost key="step1"/>;
        else if (this.state.sharingPost == 2)
            sharingPostScreen = <LocationChooser key="step2"/>;

        return (
            <div id="app">

     			<div id="top"></div>

                <div id="content">
                    <ReactCSSTransitionGroup component="div" transitionName="screen" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={250}>
                        {sharingPostScreen}
                    </ReactCSSTransitionGroup>

    				<Feed/>

                    <button className="startShare" onClick={Creator.goToSharePostStep1.bind(Creator)}>Share a post</button>
                </div>
			</div>
		);
    }
});

var Tested = React.createClass({

	componentWillEnter(cb) {
		console.log('enter', this.props.children);
		cb();
	},

	componentWillAppear(cb) {
		console.log('appear', this.props.children);
		cb();
	},

	render() {
		return (
			<li className="test">{this.props.children}</li>
		);
	}
});

window.Test = React.createClass({
    displayName: 'Test',

    getInitialState() {
        return {
			items: [<Tested key="Ok">Ok</Tested>, <Tested key="rOk">Really ok</Tested>, <Tested key="notOk">Not okeeee</Tested>]
        };
    },

    componentDidMount() {
    	setTimeout(function() {
    		var n = this.state.items.slice();
    		n.push(<Tested key="NEW ONE">Testify</Tested>);
    		this.setState({
    			items: n
    		});
    	}.bind(this), 2000)
    },

    render() {
        return (
            <ReactCSSTransitionGroup transitionName="test" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500}>
            	{this.state.items}
            </ReactCSSTransitionGroup>
        );
    }
});