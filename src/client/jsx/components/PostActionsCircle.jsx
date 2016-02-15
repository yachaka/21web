
var React = require('react');

var PostActionsCircle = React.createClass({

	render() {
		return (
			<div className="circle" style={{left: (this.props.coords) ? this.props.coords[0] : 0, top: (this.props.coords) ? this.props.coords[1] : 0, position: 'absolute'}}>
				<div className="inner-circle"></div>

				<div className="inner-line tilted-left up-left"></div>
				<div className="inner-line tilted-right up-right"></div>
				<div className="inner-line tilted-middle bottom-middle"></div>
			</div>
		);
	}
});

module.exports = PostActionsCircle;