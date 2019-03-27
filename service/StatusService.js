const StatusServer = require('../Status/server')

module.exports = {
    check: (nickname, clientId, connecter) => {
        return StatusServer.check(nickname, clientId, connecter)
    },

    find: (nickname) => {
        return StatusServer.find(nickname)
    },

    delete: (clientId) => {
        return StatusServer.delete(clientId)
    }
}