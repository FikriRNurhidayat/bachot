const http = require('http')
const chalk = require('chalk')

const app = require('../src')
const port = process.env.PORT || 8000

const server = http.createServer(app)
const WebSocket = require('../src/socket.js')
const socket = new WebSocket({
  server
})

socket.listen()
server.listen(port, () => {
  let header = {
    http: chalk.black.bgRedBright(' HTTP '),
    ws: chalk.black.bgBlueBright('  WS  ')
  }

  let body = {
    http: chalk.black.bgGreenBright(`  http://localhost:${port}  `),
    ws: chalk.black.bgGreenBright(`  ws://localhost:${port}    `)
  }

  console.log()
  for (let i in header) {
    console.log(header[i] + body[i])
  }
  console.log()
})
