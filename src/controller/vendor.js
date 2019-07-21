module.exports = class extends think.Controller {
  async indexAction() {
    let vendorId = this.cookie('vendorId')
    think.logger.info(vendorId)
    if (vendorId === null || '' === vendorId) {
      await this.redirect('/vendor/login')
    }
    else {
      this.assign('title', '供货商管理面板')
      await this.display()
    }
  }
  async loginAction() {
    let vendorId = this.cookie('vendorId')
    if (vendorId != null && vendorId != '') {
      let vendor = await this.model('vendor').where({ vendor_id: vendorId }).find()
      if (!think.isEmpty(vendor))
        await this.redirect('/vendor')
    }
    return this.display()
  }
  logoutAction() {
    this.cookie('vendorId', null, { maxAge: 0, path: '/' })
    this.redirect('/vendor/login')
  }
  async doLoginAction() {
    let data = this.post()
    let vendor = await this.model('vendor').where({ vendor_id: data['vendorId'], vendor_password: data['vendorPassword'] }).find()
    this.cookie('vendorId', vendor['vendor_id'].toString(), { maxAge: 7 * 24 * 3600 * 1000, path: '/' })
    await this.redirect('/vendor')
  }
  async profileAction() {
    let vendorId = this.cookie('vendorId')
    let vendor = await this.model('vendor').where({ vendor_id: vendorId }).find()
    if (think.isEmpty(vendor))
      return this.fail(400, 'vendor not found')
    this.json(think.omit(vendor, 'vendor_password'))
  }
  async orderAction() {
    let vendorId = this.cookie('vendorId')
    if (vendorId == null || vendorId == '')
      return this.fail(400, '未提供用户信息')
    let orderList = await this.model('order').where({ vendor_id: vendorId }).select()
    this.json(orderList)
  }
  async commodityAction() {
    let vendorId = this.cookie('vendorId')
    if (vendorId == null || vendorId == '')
      return this.fail(400, '未提供用户信息')
    let commodityList = await this.model('commodity').where({ vendor_id: vendorId }).select()
    this.json(commodityList)
  }
}