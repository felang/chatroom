const Message = require('../message')
const Client = require('../client')
const config = require('../config')
const {UserService, MessageService, StatusService} = require('../../service')
const handleObj = {}

const handleHB = function(client, message) {
    let msg = new Message()
    msg.seq = message.seq
    msg.cmd = Message.Type.HB
    msg.content = 'hb'
    client.send(msg)
}

const handleLogin = function(client, message) {
    let userInfo = JSON.parse(message.content)
    let user = UserService.login(userInfo)
    let userStatus = StatusService.check(user.nickname, client.id, config.connecter)
    if(userStatus.kickUser) {
        let kickMsg = {nickname: user.nickname, content: "有其他用户使用你的身份登录！！"}
        Client.kick(userStatus.kickUser.clientId, kickMsg)
    }
    console.log('userstatus', userStatus)
    let msg = new Message()
    msg.seq = message.seq
    msg.cmd = Message.Type.Login
    msg.content = JSON.stringify({nickname: user.nickname})
    client.send(msg)
}

const handleNewMsg = function(client, message) {
    let output = MessageService.send(JSON.parse(message.content))
    let msg = new Message()
    msg.seq = message.seq
    msg.cmd = Message.Type.NewMsg
    msg.content = JSON.stringify(output)
    client.send(msg)
}

const handlePollMsg = function(message) {

}

const handlePushMsg = function(message) {
    
}
// console.log(Message)
handleObj[Message.Type.HB] = handleHB
handleObj[Message.Type.Login] = handleLogin
// handleObj[Message.Type.Kick] = handleKick
handleObj[Message.Type.NewMsg] = handleNewMsg
handleObj[Message.Type.PollMsg] = handlePollMsg
handleObj[Message.Type.PushMsg] = handlePushMsg

module.exports = handleObj