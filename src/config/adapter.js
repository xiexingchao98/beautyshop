const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const mysql = require('think-model-mysql');
const {Console, File, DateFile} = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';
const ws = require('think-websocket-ws')
const pug = require('think-view-pug');


/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mysql',
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: mysql,
    database: 'test',
    prefix: '',
    encoding: 'utf8',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Passw0rd!',
    dateStrings: true
  }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: 'file',
  common: {
    cookie: {
      name: 'thinkjs'
      // keys: ['werwer', 'werwer'],
      // signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
};

// /**
//  * view adapter config
//  * @type {Object}
//  */
// exports.view = {
//   type: 'pug',
//   common: {
//     viewPath: path.join(think.ROOT_PATH, 'view'),
//     sep: '_',
//     extname: '.html'
//   },
//   pug: {
//     handle: pug
//   }
// };

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console
  },
  file: {
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,
    pattern: '-yyyy-MM-dd',
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  }
};


exports.websocket = {
  type: 'ws',
  common: {

  },
  ws: {
    handle: ws,
    path: '/ws',
    messages: [{
      close: '/ws/close',
      open: '/ws/open',
      message: '/ws/message'
    }]
  }
}

exports.view = {
  type: 'pug',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    extname: '.pug',
    sep: '_' //seperator between controller and action
  },
  pug: {
    handle: pug,
    beforeRender: (pug, handleOptions) => {
      // todo
    }
  }
}