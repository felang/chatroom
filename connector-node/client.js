const config = require('./config')
const Message = require('./message')
class Client {
    constructor(id, socket) {
        this.id = id
        this.socket = socket
        this.status = 1
        this.connecter = config.connecter
    }

    static new(...args) {
        Client.count += 1
        let c = new this(Client.count, ...args)
        Client.list[Client.count] = c
        return c
    }

    static destroy(id) {
        let client = this.get(id)
        client.socket.destroy()
        client.status = 0
    }

    static list() {
        return this.list
    }

    static get(id) {
        return this.list[id]
    }

    static kick(id, content) {
        let client = this.get(id)
        let kickMsg = new Message()
        kickMsg.seq = Message.ServerSeq++
        kickMsg.cmd = Message.Type.Kick
        kickMsg.content = JSON.stringify(content)
        client.send(kickMsg)
        this.destroy(client.id)

    }

    static push(id, content) {
        let client = this.get(id)
        let pushMsg = new Message()
        pushMsg.seq = Message.ServerSeq++
        pushMsg.cmd = Message.Type.PushMsg
        pushMsg.content = JSON.stringify(content)
        client.send(pushMsg)

    }

    send(message) {
        let chunk = message.toChunk()
        this.socket.write(chunk)
    }

    
}

Client.count = 0
Client.list = {}

module.exports = Client