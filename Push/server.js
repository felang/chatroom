const StatusService = require('../service/StatusService')
const pushEmitter = require('../EventEmmiter/pushEmmiter')
console.log(pushEmitter)
module.exports = {
    push: (message) => {
        let targetStatus = StatusService.find(message.to)
        if(targetStatus) {
            pushEmitter.emit('push', targetStatus.clientId, targetStatus.connecter, message)
            return targetStatus
        }else {
            return null
        }
    }
}