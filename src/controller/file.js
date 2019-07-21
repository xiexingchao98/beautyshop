const fs = require('fs')
const path = require('path')
const rename = think.promisify(fs.rename, fs)
const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()-=_+'
const reverseChars = Array.from(chars).reverse().toString()

module.exports = class extends think.Controller {
  async uploadAction () {
    let file = this.file('file')
    let filepath = think.ROOT_PATH + '/www/static/upload/' + file.name
    think.mkdir(path.dirname(filepath))
    await rename(file.path, filepath)
    // this.body = encrypt(file.name)
  }
  async downloadAction () {
    let filename = decrypt(this.ctx.param('f'))
    this.ctx.download(think.ROOT_PATH + '/www/static/upload/' + filename)
  }
}

function encrypt (filename)  {
  return convert(filename, chars, reverseChars)
}

function decrypt (filename) {
  return convert(filename, reverseChars, chars)
}

function convert(str, currentChars, targetChars) {
  let len = str.length
  let ret = ''
  for (let i = 0; i < len; ++i) {
    let ch = str.charAt(i)
    let index = currentChars.indexOf(ch)
    if (index != -1) {
      ch = targetChars.charAt(index)
    }
    ret += ch
  }
  return ret
}