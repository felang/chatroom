const PushServer = require('../Push/server')

module.exports = {
    push: (nickname) => {
        return PushServer.push(nickname)
    }
}