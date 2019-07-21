module.exports = class extends think.Controller {
  async indexAction () {
    let data = await think.model('commodity').limit(20).select()
    this.json(data)
  }
  async viewAction () {
    let param = this.ctx.query
    let data = await think.model('commodity').where({ id: param.id }).find()
    this.json(data)
  }
  async searchAction () {
    let param = this.ctx.query
    let data = await this.model('commodity').where("name like \'%" + `${param.keyword}` +  "%\'").select()
    this.json(data)
  }
  async addAction () {
    let data = this.post()
    let commodity_id = await this.model('commodity').add(data)
    this.json({ id: commodity_id })
  }
  async updateAction () {
    let data = this.post()
    let affectedRows = this.model('commodity').where({ id: data.id }).update(think.omit(data, 'id'))
    if (affectedRows < 1)
      this.ctx.status = 500
  }
  async deleteAction () {
    const commodity = this.post('commodity')

    let affectedRows = await this.model('commodity').where({ commodity_id: commodity.commodity_id }).delete();
    if (affectedRows < 0)
      return this.fail('删除商品失败')
  }
  async updatePriceAction () {
    const commodity = this.post('commodity')
    let affectedRows = await this.model('commodity').where({commodity_id: commodity.commodity_id}).update({commodity_price: commodity.commodity_price})
    if (affectedRows < 1)
      return this.fail('调增商品价格失败')
    return this.success('调整商品价格成功')
  }
  async updateStockAction () {
    const commodity = this.post('commodity')
    let affectedRows = await this.model('commodity').where({commodity_id: commodity.commodity_id}).update({commodity_stock: commodity.commodity_stock})
    if (affectedRows < 1)
      return this.fail('更新商品库存失败')
    return this.success('更新商品库存成功')
  }
  async updateDetailAction () {
    const commodity = this.post('commodity')
    let affectedRows = await this.model('commodity').where({commodity_id: commodity.commodity_id}).update(think.omit(commodity, 'commodity_id'))
    if (affectedRows < 1)
      return this.fail(400, '更新商品详情失败')
    return this.success('更新商品详情成功')
  }
}