const Message = require('./MessageModel')
const PushService = require('../service/PushService')
console.log('service', require('../service'))
module.exports = {
    send: (message) => {
        let msg = Message.create(message)
        let pushMsg = PushService.push(msg)
        console.log('PushMsg', pushMsg)
        return msg
    }
}