
var React = require('react')
    , Modal = require('../common/Modal.jsx')
    , Register = require('./Register.jsx')

    , NavigationCreator = require('../../actions/NavigationCreator')
    , AuthCreator = require('../../actions/AuthCreator');

import { connect } from 'react-redux'

import ValidationError from '../../../../shared/errors/ValidationError'
import { setModal, closeModal, login } from '../../actions'

let ErrorComponent = Base => class extends Base {
    constructor(props) {
        super(props)
        this.state = {
            errors: {},
            ...this.state
        };

        this.setErrors = this.setErrors.bind(this);
        this.resetErrors = this.resetErrors.bind(this);
    }

    setErrors(errors) {
        this.setState({
            errors: errors
        });
    }

    resetErrors() {
        this.setState({
            errors: {}
        });
    }
}

// class VError extends React.Component {
//     static contextTypes = {
//         errors: React.PropTypes.objectOf(
//             React.PropTypes.arrayOf(
//                 React.PropTypes.string
//             )
//         )
//     };

//     static propTypes = {

//     };

//     render() {
//         if ()
//         return <p>{JSON.stringify(this.context.errors)}</p>;
//     }
// }

class InlineError extends React.Component {
    render() {

        if (this.props.error)
            return (<p className="inline-error">{this.props.error}</p>);
        return null;
    }
}


class Login extends ErrorComponent(React.Component) {
    constructor(props) {
        super(props)
    }


    login = () => {
        this.props.login(this.refs.username.value, this.refs.password.value).then(
            user => this.props.closeMe(),
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
                        <InlineError error={this.state.errors.__global}/>

                        <input autoFocus ref="username" type="text" placeholder="Identifiant" className="classic" onChange={this.resetErrors}/>
                        <input ref="password" type="password" placeholder="Password" className="classic" onChange={this.resetErrors}/>
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
    null,
    {
        goToRegisterModal: _setModalRegister,
        closeMe: closeModal,
        login: login
    },
    (stateProps, dispatchProps, ownProps) => Object.assign({key: 'loginModal'}, ownProps, stateProps, dispatchProps)
)(Login);