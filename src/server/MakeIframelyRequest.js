
import cfg from '@config'
import reqwest from 'reqwest'

export default function (forUrl) {
	return reqwest({
		url: cfg.IFRAMELY_API_URL,
		method: 'get',
		data: [
			{name: 'url', value: forUrl},
			{name: 'api_key', value: cfg.IFRAMELY_API_KEY},
			{name: 'media', value: true}, // Prefer Media-only previews, @see Iframely API Docs
			{name: 'omit_script', value: true} // Omit script embed.js as it is loaded in base page @see Iframely API Docs
		],
		type: 'json'
	});
}