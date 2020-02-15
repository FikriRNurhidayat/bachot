const {
  Server
} = require('ws')
const chalk = require('chalk')

module.exports = class WebSocket extends Server {

  constructor(props) {
    super(props)

    this.clients = new Set()
    this.channel = []
  }

  listen() {
    this.on('connection', this.onConnection)
  }

  onConnection(client, req) {
    const connection = req.headers['user-agent'];
  
    console.log(
      chalk.black.bgGreenBright(' Connection '),
      chalk.yellow(connection)
    )

    this.clients.add(client)
    client._id = Math.random()

    client.on('message', payload => this.route(client, payload))
    client.on('close', this.onClose)
  }

  onClose() {
    console.log(chalk.black.bgRedBright(' Disconnected '))
  }

  route(client, payload) {
    try {
      payload = JSON.parse(payload)
      let response = JSON.stringify({
        status: true,
        data: payload.data
      })

      this.clients.forEach(i => i.send(response))
    }

    catch(err) {
      payload = JSON.stringify({
        status: false,
        errors: 'Goblok! Kirim JSON goblok!'
      })
      client.send(payload)
    }
  }
}
