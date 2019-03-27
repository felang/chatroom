var net = require("net")
var host = process.env.host || "127.0.0.1"
var port = process.env.port || 8125
var Message = require("../connector-node/message")
const Client = require('./client')
connect = (host, port)=>{
  var c
  c = net.connect({
    port: port,
    host: host
  }, ()=>{
    let client = new Client(c)
    client.hb()
    client.login('felang1')
    setTimeout(() => {
      client.sendto('felang2')
      client.msg('我的天呐')
      client.msg('在? ')

    }, 3000)
    
    })
    

  // })

  c.on("data", (chunk)=>{
    var message = Message.ReadMessage(chunk)
    switch (message.cmd) {
      case Message.Type.HB:
        console.log('心跳回忆')
        return

      case Message.Type.Login:
        console.log('登录成功', message.content)
        return
      case Message.Type.Kick:
        console.log('被踢出', message.content)
        return
      case Message.Type.NewMsg:
        console.log('发送成功', message.content)
        return
    }
  })

  c.on("end", ()=>{
    console.log("end")
  })

  c.on("error", (error)=>{
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