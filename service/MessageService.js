const MessageServer = require('../Message/server')

module.exports = {
    send: (message) => {
        return MessageServer.send(message)
    }
}