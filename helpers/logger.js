const log = require('winston');

async function infoLogger(info, action) {
    log.info(`${new Date()}- Info  ${info} ${action}`);
}

module.exports = { infoLogger };