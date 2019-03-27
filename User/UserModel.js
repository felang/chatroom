class User {
    constructor() {

    }

    static create(userInfo) {
        User.id += 1
        let user = {
            id: User.id,
            nickname: userInfo.nickname
        }
        User.list.push(user)
        console.log('UserList', User.list)
        return user
    }

    static find(nickname) {
        for (let i = 0; i < User.list.length; i++) {
            if(nickname === User.list[i].nickname) {
                return User.list[i]
            }
        }
        return null
    }
}

User.id = 0
User.list = []

module.exports = User