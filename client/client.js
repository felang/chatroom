var Message = require("../connector-node/message")
class Client {
    constructor(connect){
        this.status = 0
        this.connect = connect
        this.nickname = ''
        this.target = ''
        this.seq = 0
    }

    sendto(to) {
        this.target = to
    }

    hb() {
        this.seq += 1
        this.connect.write(Message.hb(this.seq))
    }

    login(nickname) {
        this.seq += 1
        this.status = 1
        this.nickname = nickname
        this.connect.write(Message.login(this.seq, nickname))
    }

    msg(content) {
        let c = {
            from: this.nickname,
            to: this.target,
            type: 2,
            content: content,
            datetime: Date.now()
        }
        this.seq += 1
        
        this.connect.write(Message.newMsg(this.seq, c))
    }
}

module.exports = Client