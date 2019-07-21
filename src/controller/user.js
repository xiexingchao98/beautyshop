var rp = require('request-promise')

module.exports = class extends think.Controller {
  async loginAction () {
    if (!this.ctx.isPost)
      return false
    let data = this.ctx.post()
    think.logger.info('login request :', data)
    if (!data.code) {
      this.body = 'code invalid'
      return false
    }
    let code2session = 'https://api.weixin.qq.com/sns/jscode2session'
    let options = {
      url: code2session + `?appid=${process.env['weixin_appid']}` + `&secret=${process.env['weixin_secret']}` + "&js_code=" + data.code + "&grant_type=authorization_code",
      method: 'get',
      json: true
    }
    let id;
    await rp(options).then(async (res) => {
      think.logger.info('weixin oauth login :', res)
      let user = await think.model('user').where({ openid: res['openid'] }).find()
      let fieldValues = {
        openid: res['openid'],
        session_key: res['session_key'],
        nickname: data.userInfo.nickName,
        gender: data.userInfo.gender
      }
      // 用户不存在，则新建用户记录
      if (think.isEmpty(user)) {
        let id = await think.model('user').add(fieldValues)
        // 新建记录失败，抛出异常
        if (id == 0)
          throw new Error('新建用户记录失败')
        // 懒得设置触发器，在这里初始化一下用户的购物车记录
        think.model('cart').add({ user_id: id })
      }
      // 用户记录已经存在，则更新相关字段
      let affectedRows = await think.model('user').where({ openid: res['openid'] }).update(fieldValues)
      // 更新字段失败，抛出异常
      if (affectedRows != 1)
        throw new Error('更新用户数据失败')
      this.json({ id: user.id })
    }).catch(err => {
      think.logger.info(err)
      this.body = err
      this.ctx.status = 500
    })
  }
  profileAction () {
    this.body = 'profile'
  }
}