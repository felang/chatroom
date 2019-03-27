const Message = require("../connector-node/message")
const fs = require('fs')

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

    pollMsg() {
        let content = {
            from: this.target,
            to: this.nickname,
            lastMessageId: this.getLastMsgId(this.target)
        }
        this.connect.write(Message.pollMsg(this.seq, content))
    }

    receive(message) {
        let content = JSON.parse(message.content)
        this.setLastMsgId(content.from, content.id)
        console.log(`receive ${content.from}:  ${content.content}   At: ${content.datetime}`)
    }

    receivePoll(message) {
        let msgList = JSON.parse(message.content)
        this.setLastMsgId(this.target, content.id)
        console.log
    }

    getLastMsgId(from) {
        let content = JSON.parse(fs.readFileSync(Client.MsgIdFile, 'utf8'))
        let result = content[this.nickname][from]
        return result
    }

    setLastMsgId(from, msgId) {
        let content = JSON.parse(fs.readFileSync(Client.MsgIdFile, 'utf8'))
        if(!content[this.nickname]) {
            content[this.nickname] = {}
        }
        content[this.nickname][from] = msgId
        fs.writeFileSync(Client.MsgIdFile, JSON.stringify(content))
    }
}

Client.MsgIdFile = 'msgId.txt'

module.exports = Client