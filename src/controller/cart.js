module.exports = class extends think.Controller {
  async indexAction () {
    let param = this.ctx.query
    if (!param['id']) {
      this.ctx.status = 404
      return
    } 
    if (!think.isEmpty(param)) {
      let cart_record = await think.model('cart').where({ user_id: param.id }).find()
      this.json(cart_record['item'])
    }
  }
  async updateAction () {
    let param = this.post();
    let updatedRows = await think.model('cart')
    .where({ user_id: param.userID }).update({ item: JSON.stringify(param.item) });
    if (updatedRows != 1)
      this.ctx.status = 500
  }
}