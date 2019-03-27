const UserServer = require('../User/server')

module.exports = {
    login: (userInfo) => {
        return UserServer.login(userInfo)
    }
}