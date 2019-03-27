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
    message.content = JSON.stringify({nickname:'felang3'})

    // console.log(message.toChunk())
    client.write(message.toChunk())
    console.log(message)
    // let from = process.argv.splice(2)[0]
    // let to = process.argv.splice(2)[1]
    // if(process.argv.splice(2)[1]) {
      // console.log('pushmsg', process.argv.splice(2)[0], process.argv.splice(2)[1])
      setInterval(()=>{
        var datetime = Date.now()
        let msg = {
          from: 'felang3',
          to: 'felang2',
          type: 2,
          content: '好hi哦!!',
          datetime,
        }
        console.log('要发送的信息', msg)
        var message = new Message()
        message.seq = seq++
        message.cmd = Message.Type.NewMsg
        message.content = JSON.stringify(msg)
  
        client.write(message.toChunk())
        console.log(message)
      }, 5 * 1000)
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