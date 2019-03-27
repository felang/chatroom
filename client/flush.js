function flush() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
}
let content = [{nickname: 'test1', content: 'hello!'}, {nickname: 'test2', content: 'how are you there?'}]
const printContent = (content) => {
    content.forEach((msg) => {
        process.stdout.write(`${msg.nickname}: ${msg.content}\n`)
    })
}

var total = 5000;
var current = 0;
var percent = 0;
var waitingTime = 500;
setInterval(function() {
    current += waitingTime;
    percent = Math.floor((current / total) * 100);
    flush();
    // process.stdout.write(`downloading ... ${percent}%`);
    printContent(content)
    if (current >= total) {
        console.log("\nDone.");
        clearInterval(this);
    }
}, waitingTime);