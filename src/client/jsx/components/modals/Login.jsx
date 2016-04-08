
var React = require('react')
    , Modal = require('../common/Modal.jsx')
    , Register = require('./Register.jsx')

    , NavigationCreator = require('../../actions/NavigationCreator')
    , AuthCreator = require('../../actions/AuthCreator');

import { connect } from 'react-redux'

import { setModal } from '../../actions'

class Login extends React.Component {

    render() {
        return (
            <Modal id="loginModal">

                <div className="top">
                    <div className="row">
                        <h2 className="col-xs-23 col-xs-offset-1">Se connecter</h2>
                    </div>

                    <div className="row">
                        <p className="col-xs-23 col-xs-offset-1 no-account">
                            <a onClick={this.props.goToRegisterModal}>Pas encore de compte ?</a>
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-23 col-xs-offset-1">
                        <input autoFocus ref="username" type="text" placeholder="Identifiant" className="classic"/>
                        <input ref="password" type="password" placeholder="Password" className="classic"/>
                        <button 
                            onClick={this.props.login}>
                            Se connecter
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default connect(
    () => ({
        key: 'loginModal'
    }),
    {
        goToRegisterModal: () => setModal(Register()),
        login: () => console.log('lol')
    }
)(Login);