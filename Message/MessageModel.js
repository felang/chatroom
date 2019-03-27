class Message {
    constructor() {

    }

    static create(message) {
        Message.id += 1
        let m = {
            id: Message.id,
            from: message.from,
            to: message.to,
            datetime: message.datetime,
            type: message.type,
            content: message.content,
        }
        Message.list.push(m)
        console.log('MessageList', Message.list)
        return m
    }

    static find(msgId) {
        // let msgList = []
        for (let i = 0; i < Message.list.length; i++) {
            if(msgId === Message.list[i].id) {
                return Message.list[i]
            }
        }
        return null
    }

    static pollMsg(condition) {
        let msgList = []
        for (let i = 0; i < Message.list.length; i++) {
            if(
                condition.from === Message.list[i].from &&
                condition.to === Message.list[i].to &&
                condition.lastMessageId < Message.list[i].id
            ) {
                msgList.push(Message.list[i])
            }
        }
        return msgList
    }

    // static findList()
}

Message.id = 0
Message.list = []

module.exports = Message