
var React = require('react');

window.AppSharer = React.createClass({
    displayName: 'AppSharer',

    getInitialState() {
        return {
            information: null // {msg: 'Here the msg', class: 'class of msg div'}  
        };
    },

    handleKeyDown: function (e) {
    	this.setState({
    		information: null
    	});
    	if (e.keyCode == 13) {
    		this.handlePostUrl(this.refs.postUrlInput.value);
    	}
    },
    handlePostUrl: function (url) {
    	var ids;

    	if (ids = url.match(/https:\/\/www\.facebook\.com\/([a-zA-Z]+)\/posts\/([0-9]+)/)) {
    		window.FB.api('/' + ids[1], {access_token: 187629908268656}, function (response) {
    			console.log(response);
    		});
    	}
    },

    render() {
        return (
            <div>
            	<h3>Share a facebook post</h3>
            	<input ref="postUrlInput" type="text" placeholder="URL of the post" onKeyDown={this.handleKeyDown}/>

            </div>
        );
    }
});