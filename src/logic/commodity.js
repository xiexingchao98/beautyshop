module.exports = class extends think.Logic {
  deleteAction () {
    this.allowMethods = 'delete'
  }
}