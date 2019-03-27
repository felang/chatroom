const readline = require('readline')
// const operate = require('./operate')
const rl = readline.createInterface(process.stdin, process.stdout)
const cp = require('child_process')

rl.setPrompt('聊天室> ')
rl.prompt()
let app = cp.fork('./app.js')
rl.on('line', function(line) {
    app.send(line.trim())

    rl.prompt()
})

rl.on('close', function() {
    console.log('bye bye!')
    process.exit(0)
})


process.on('exit', (code) => {
    console.log(`退出码: ${code}`)
    app.send('kill')
})

