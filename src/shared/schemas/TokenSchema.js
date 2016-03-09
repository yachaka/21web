
module.exports = {
    type: {
        presence: true,
        inclusion: ["connect", "claim"]
    },
    user_id: {
        presence: true,
        numericality: true
    }
};