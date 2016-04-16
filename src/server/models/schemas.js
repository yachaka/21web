
export default {
	unsignedInteger: {
		presence: true,
		numericality: {
			onlyInteger: true,
			greaterThan: 0
		}
	}
};