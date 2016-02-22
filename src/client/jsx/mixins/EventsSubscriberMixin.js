
function EventsSubscriberMixin (eventEmitter) {
	
	return {
		componentWillMount: function () {
			this.subscribedEvents = [];
		},

		subscribeToEvent: function (event, listener) {
			this.subscribedEvents.push({event: event, listener: listener});
			eventEmitter.on(event, listener);
		},

		componentWillUnmount: function () {
			for (var i = 0; i < this.subscribedEvents.length; i++) {
				eventEmitter.removeListener(this.subscribedEvents[i].event, this.subscribedEvents[i].listener)
			}
		},

		wrappedSetState: function (newState) {
			return function () {
				this.setState(newState);
			}.bind(this);
		}
	};
};

module.exports = EventsSubscriberMixin;