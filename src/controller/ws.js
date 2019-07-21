module.exports = class extends think.Controller {
  openAction () {
    this.emit('welcom to websocket')
  }
  closeAction () {
    this.emit('bye bye')
  }
  messageAction () {
    let data = this.wsData.data
    this.broadcast('message', data)
  }
}