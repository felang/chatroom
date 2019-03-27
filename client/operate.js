const Client = require('./app')
const Message = require('./message')
module.exports = {
    login: (nickname) => {
        let logMessage = Message.loginMsg(nickname)
        client.login(logMessage)
    },

    sendto: (to) => {
        
    }
}