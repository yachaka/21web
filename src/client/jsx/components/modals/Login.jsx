
var React = require('react')
    , Modal = require('../common/Modal.jsx')
    , Register = require('./Register.jsx')

    , NavigationCreator = require('../../actions/NavigationCreator')
    , AuthCreator = require('../../actions/AuthCreator');

import { connect } from 'react-redux'

import ValidationError from '../../../../server/errors/ValidationError'
import { setModal, login } from '../../actions'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: null
        };
    }


    login = () => {
        this.props.login(this.refs.username.value, this.refs.password.value).catch(
            err => {
                if (err instanceof ValidationError)
                    this.setState({errors: err.errors});
                else
                    throw err;
            }
        );
    }

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
                        <p>{this.state.errors && this.state.errors.__global}</p>

                        <input autoFocus ref="username" type="text" placeholder="Identifiant" className="classic"/>
                        <input ref="password" type="password" placeholder="Password" className="classic"/>
                        <button 
                            onClick={this.login}>
                            Se connecter
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

var _setModalRegister = () => setModal(Register());

export default connect(
    () => ({
        key: 'loginModal'
    }),
    {
        goToRegisterModal: _setModalRegister,
        login: login
    }
)(Login);