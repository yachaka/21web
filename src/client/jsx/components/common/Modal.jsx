
import { Component } from 'react'
import { connect } from 'react-redux'
import { closeModal } from '../../actions'
var NavigationCreator = require('../../actions/NavigationCreator');

let Modal = ({id, children, close}) => (
    <div id={id} className="modal container">
    	
    	<div className="close-modal row">
    		<p className="col-xs-23 col-xs-offset-1">
        		<a href="javascript:void(0);" onClick={close}><img src="/img/close.png" alt="Annuler"/>Annuler</a>
    		</p>
    	</div>

    	{children}
    </div>
);

module.exports = connect(
    (state, ownProps) => ({
        id: ownProps.id,
        children: ownProps.children
    }),
    {
        close: closeModal
    }
)(Modal);