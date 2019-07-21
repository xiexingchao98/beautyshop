module.exports = class extends think.Logic  {
  detailAction () {
    this.allowMehods = 'get'
    let rules = {
      order_id: {
        int: true,
        required: true
      }
    }
    let flag = this.validate(rules)
    if (!flag)
      this.ctx.status = 400    
  }
  createAction () {
    this.allowMethods = 'post'
    let rules = {
      user_id: {
        int: true,
        required: true
      },
      vendor_id: {
        int: true,
        required: true
      },
      item: {
        array: true,
        required: true
      },
      total_price: {
        floa: true,
        required: true
      }
    }
    let flag = this.validate(rules)
    if (!flag)
      this.ctx.status = 400    
  }
  deliverAction () {
    this.allowMethods = 'post'
    let rules = {
      order_id: {
        int: true,
        required: true
      },
      deliver_id: {
        int: true,
        required: true
      },
      deliver_number: {
        int: true,
        required: true
      }
    }
    let flag = this.validate(rules)
    if (!flag)
      this.ctx.status = 400    
  }
  cancelAction () {
    this.allowMethods = 'patch'
    let rules = {
      order_id: {
        int: true,
        required: true
      }
    }
  }
}