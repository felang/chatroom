const Client = require('./client')
const push = (clientId, connecter, message) => {
    console.log('Push To ClientId', clientId, connecter)
    Client.push(clientId, JSON.stringify(message))
}

module.exports = push