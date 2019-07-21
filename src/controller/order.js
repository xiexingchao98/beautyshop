module.exports = class extends think.Controller {
  async createAction () {
    let data = this.post()
    let order_id = await this.model('order').add(data)
    if (order_id == 0)
      this.ctx.status = 500
      
    this.json({ id: order_id })
  }

  async deliverAction () {
    let data = this.post()
    let affectedRows = await this.model('order').where({id : data['order_id']}).update(think.omit(data, 'order_id'))
    if (affectedRows < 1)
      this.ctx.status = 500
  }
  async detailAction () {
    let ret = await this.model('order').where({ id: this.get('order_id') }).find()
    this.json(ret)
  }
  async updateDeliverAction () {
    const order = this.post('order')
    let affectedRows = await this.model('order').where({order_id: order.order_id}).update(think.omit(order, 'order_id'))
    if (affectedRows < 1) {
      return this.fail(400, '设置物流信息失败')
    }
    return this.success('设置物流信息成功')
  }
}