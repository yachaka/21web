
var React = require('react')
    , NavigationCreator = require('../../actions/NavigationCreator');

var Modal = React.createClass({
    displayName: 'Modal',
    render() {
        return (
            <div id={this.props.id} className="modal container">
            	
            	<div className="close-modal row">
            		<p className="col-xs-23 col-xs-offset-1">
	            		<a href="javascript:void(0);" onClick={NavigationCreator.closeModal}><img src="/img/close.png" alt="Fermer"/>Fermer</a>
            		</p>
            	</div>

            	{this.props.children}
            </div>
        );
    }
});

module.exports = Modal;