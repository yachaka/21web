
var React = require('react');

var ErrorDisplayer = React.createClass({
    render() {

    	var errors = this.props.errors ? this.props.errors.map(function (val, i) {
    		return <p className="error-message" key={i}>{val}</p>;
    	}) : null;
        var className = this.props.errors ? 'error' : '';
        return (
            <div className={className}>
            	{errors}
            	{this.props.children}
            </div>
        );
    }
});

module.exports = ErrorDisplayer;