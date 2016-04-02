
var React = require('react');

var Modal = React.createClass({
    displayName: 'Modal',
    render() {
        return (
            <div id={this.props.id} className="modal container">
            	{this.props.children}
            </div>
        );
    }
});

module.exports = Modal;