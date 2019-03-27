const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
const cp = require('child_process')
function flush() {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
}
rl.setPrompt('Test> ')
rl.prompt()

rl.on('line', function(line) {
    switch(line.trim()) {
        case 'copy':
            console.log("复制")
            break
        case 'hello':
            console.log('world!')
            flush()
            break
        case 'close':
            rl.close()
            break
        default:
            console.log('You: ', line)
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