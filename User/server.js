const User = require('./UserModel')

module.exports = {
    login: (userInfo) => {
        let user = User.find(userInfo.nickname)
        if(!user) {
            return User.create(userInfo)
        }
        return user
    },

    find: (nickname) => {
        return User.find(nickname)
    }
}