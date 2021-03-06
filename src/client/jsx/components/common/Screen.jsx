
var React = require('react')
	, ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Screen = React.createClass({
	propTypes: {
		id: React.PropTypes.string,
		modals: React.PropTypes.objectOf(React.PropTypes.element)
	},
	getDefaultProps() {
	    return {
	        modals: {}  
	    };
	},

	statics: {
        calculateState: function (prevState) {
            return {
                modalShown: null
            };
        }
    },

    render() {
    	var modalDisplayed;
    	for (var key in this.props.modals) {
    		if (key === this.state.modalShown) {
    			modalDisplayed = this.props.modals[key];
    			break ;
    		}
    	}

    	var className = modalDisplayed ? 'screen modal-active' : 'screen';

        return (
            <div id={this.props.id} className={className}>
            	<ReactCSSTransitionGroup id="modalWrapper" component="div" transitionName="modal" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={250}>
	                {modalDisplayed}
	            </ReactCSSTransitionGroup>

	            {this.props.children}
	        </div>
        );
    }
});

module.exports = Screen;