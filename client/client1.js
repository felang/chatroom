var net = require("net")
var host = process.env.host || "127.0.0.1"
var port = process.env.port || 8125
var Message = require("../connector-node/message")

connect = (host, port)=>{
  var client
  var seq = 0
  client = net.connect({
    port: port,
    host: host
  }, ()=>{
    var message = new Message()
    message.seq = seq++
    message.cmd = Message.Type.HB
    message.content = "心跳起来"

    // console.log(message.toChunk())
    client.write(message.toChunk())
    console.log(message)

    var message = new Message()
    message.seq = seq++
    message.cmd = Message.Type.Login
    message.content = JSON.stringify({nickname:'felang2'})

    // console.log(message.toChunk())
    client.write(message.toChunk())
    console.log(message)
    
    })
    

  // })

  client.on("data", (chunk)=>{
    // var diff, result, start

    // start = parseInt(chunk.toString("utf8", 3, 16))
    // diff = Date.now() - start
    // result = chunk.toString("utf8")

    // console.log("rece diff:" + diff + " " + result)

    var message = Message.ReadMessage(chunk)
    console.log('回执', message)
  })

  client.on("end", ()=>{
    console.log("end")
  })

  client.on("error", (error)=>{
    console.log("error", error)
  })
}

connect(host, port)

// process.on('message', (msg) => {
//   console.log(msg.toString())
//   if(msg.toString() === 'kill') {
//     process.exit(1)
//   }
// })