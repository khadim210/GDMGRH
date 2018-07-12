'use strict';

import httpLogger from 'pino-http';
import logger from './index';

/**
 * Serializer of request
 * @param {Request} req
 */
function reqValue(req) {
  const _req = {};
  _req.id = typeof req.id === 'function' ? req.id() : req.id;
  _req.method = req.method;
  _req.url = req.url;
  _req.headers = req.headers;
  _req.body = req.raw.body;
  _req.params = req.raw.params;
  _req.query = req.raw.query;
  _req.remoteAddress = req.remoteAddress;
  _req.remotePort = req.remotePort;
  return _req;
}

/**
 * Serializer of response
 * @param {Response} res
 */
function resValue(res) {
  const _res = {};
  _res.statusCode = res.statusCode;
  _res.header = res.header;
  return _res;
}

export default httpLogger({
  logger,
  serializers: {
    req: reqValue,
    res: resValue
  }
});
