import React from 'react';
import { createDevTools } from 'redux-devtools';

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

let selectDevToolsState = (state) => {
	var d = {};

	for (var key in state) {
		if (state[key] && state[key].toJS)
			d[key] = state[key].toJS();
		else
			d[key] = state[key];
	}
	return d;
};

export default createDevTools(
	<DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               select={selectDevToolsState}
               defaultIsVisible={true}>
		  <LogMonitor />
	</DockMonitor>
);