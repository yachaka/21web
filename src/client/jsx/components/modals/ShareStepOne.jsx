var React = require('react');

var AppStateCreator = require('../../actions/AppStateCreator')
    , Creator = require('../../actions/Creator')
    , ValidateMixin = require('../../mixins/ValidateMixin')
    , FluxContainerMixin = require('flux/utils').Mixin

    , ErrorDisplayer = require('../common/ErrorDisplayer.jsx')
    , Input = require('../common/Input.jsx')

    , Validator = require('validate.js')

    , UserStore = require('../../stores/UserStore');


var PostSchema = require('../../../../shared/schemas/PostSchema');
// <ErrorDisplayer errors={this.errors('url')}>
//     <input ref="url" autoFocus placeholder="URL of the post you want to locate" type="text" defaultValue={this.state.validationData.url}/>
// </ErrorDisplayer>
var ShareStepOne = React.createClass({
    mixins: [ValidateMixin(Validator), FluxContainerMixin([UserStore])],
    statics: {
        calculateState: function (prevState) {
            return {
                loggedUser: UserStore.getLoggedUser()
            };
        }
    },

    goToStep2() {
        if (Object.keys(this.validate({url: this.state.url, text: this.state.text}, PostSchema)).length == 0)
            Creator.goToSharePostStepTwo(this.state.url, this.state.text);
    },

    render() {
        return (
            <div id="enterDescriptionModal" className="modal fullwidth-modal white">
                <button className="cancel" onClick={AppStateCreator.closeActiveModal.bind(Creator)}>Annuler</button>
                <div className="user-info">
                    <div className="avatar"><img src="https://pbs.twimg.com/profile_images/378800000767456340/d2013134969a6586afd0e9eab6b0449b.jpeg" /></div>
                    <p className="username">{this.state.loggedUser.username}</p>
                </div>
                <ErrorDisplayer errors={this.errors('url')}>
                    <input ref={this.registerFor('url')} autoFocus placeholder="URL du post" type="text"/>
                </ErrorDisplayer>
                
                <ErrorDisplayer errors={this.errors('text')}>
                    <textarea ref={this.registerFor('text')} placeholder="Parlez-nous du post"></textarea>
                </ErrorDisplayer>

                <button onClick={this.goToStep2} className="next">Continuer</button>
            </div>
        );
    }
});

module.exports = ShareStepOne;