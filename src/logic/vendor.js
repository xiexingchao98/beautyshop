module.exports = class extends think.Logic {
  __before () {}
  indexAction () {
    this.allowMethods = 'get'
  }
  loginAction () {
    this.allowMethods = 'get'
  }
  doLoginAction () {
    this.allowMethods = 'post'
  }
  logoutAction () {
    this.allowMethods = 'get'
  }
}