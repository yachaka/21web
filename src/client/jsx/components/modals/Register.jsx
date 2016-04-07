
var React = require('react')
	, Modal = require('../common/Modal.jsx');

var Register = React.createClass({
    render() {
        return (
            <Modal id="registerModal">
            	<div className="row">
                    <h2 className="col-xs-23 col-xs-offset-1">Inscription</h2>
                </div>
           	</Modal>
        );
    }
});

module.exports = () => <Register key="registerModal"/>;