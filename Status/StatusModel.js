class Status {
    constructor() {

    }

    static create(nickname, clientId, connecter) {
        Status.object[nickname] = {
            connecter,
            clientId,
        }
        console.log('StatusObj', Status.object)
        return Status.object[nickname]
    }

    static find(nickname) {
        return Status.object[nickname]
    }

    static delete(clientId) {
        let list = Object.keys(Status.object)
        list.forEach((status) => {
            if(Status.object[status].clientId === clientId) {
                delete Status.object[status]
            }
        })
    }

    // static update(nickname)
}

Status.object = {}

module.exports = Status