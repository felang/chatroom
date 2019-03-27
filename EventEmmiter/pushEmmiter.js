const EventEmitter = require('events')
const push = require('../connector-node/push')
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()
myEmitter.on('push', push)

module.exports = myEmitter