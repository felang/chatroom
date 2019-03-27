const Status = require('./StatusModel')

module.exports = {
    check: (nickname, clientId, connecter) => {
        let status = Status.find(nickname)
        if(!status) {
            let statusNew = Status.create(nickname, clientId, connecter)
            return {status: statusNew, kickUser: null}
        }else {
            let statusUpdate = Status.create(nickname, clientId, connecter)
            
            return {status: statusUpdate, kickUser: status}
        }
    },

    find: (nickname) => {
        return Status.find(nickname)
    }
}