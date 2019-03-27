const readline = require('readline')
const operate = require('./operate')
const rl = readline.createInterface(process.stdin, process.stdout)
const cp = require('child_process')

rl.setPrompt('Test> ')
rl.prompt()

rl.on('line', function(line) {
    let command = line.trim().split(' ')[0]
    let param = line.trim().split(' ').slice[1]
    switch(command) {
        case 'login':
            operate.login(...param)
            console.log('登录成功')
            break
        case 'sendto':
            console.log('切换聊天对象', ...param)
            operate.sendto(...param)
            flush()
            break
        case 'msg':
            operate.msg(...param)
            break
        case 'ulist':
            operate.msg(...param)
            break
        default:
            console.log('无此指令')
            break
    }
    rl.prompt()
})

rl.on('close', function() {
    console.log('bye bye!')
    process.exit(0)
})

// let client = cp.fork('./client.js')
// client.send('hello world!!!')
// process.on('exit', (code) => {
//     console.log(`退出码: ${code}`)
//     client.send('kill')
// })

// process.on('message', (msg) => {
//     console.log('message   ', msg.toString())
// })