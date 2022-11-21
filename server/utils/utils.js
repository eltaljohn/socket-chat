const createMessage = (name, message) => ({name, message, date: new Date().getTime()});

module.exports = { createMessage };