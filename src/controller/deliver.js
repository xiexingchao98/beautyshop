module.exports = class extends think.Controller {
  async addAction () {
    let data = this.post()
    let deliver_id = await this.model('deliver').add(data)
    this.json({ id: deliver_id })
  }
  async indexAction () {
    let deliver = await this.model('deliver').select()
    this.json(deliver)
  }
}