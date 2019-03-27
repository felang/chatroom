class Status {
    constructor() {

    }

    static create(nickname, clientId, connecter) {
        Status.object[nickname] = {
            connecter,
            clientId,
        }
        console.log('StatusObj', Status.object)
        return Status[nickname]
    }

    static find(nickname) {
        return Status.object[nickname]
    }

    // static update(nickname)
}

Status.object = {}

module.exports = Status