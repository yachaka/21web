
var React = require('react');

var ErrorDisplayer = require('./ErrorDisplayer.jsx');

var Input = React.createClass({
	contextTypes: {
		getErrors: React.PropTypes.func
	},

    render() {
        return (
            <ErrorDisplayer errors={this.context.getErrors(this.props.name)}>
            	<input {...this.props}/>
            </ErrorDisplayer>
        );
    }
});

module.exports = Input;