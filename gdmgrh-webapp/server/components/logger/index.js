import pino from 'pino';
import config from '../../config/environment';

const pretty = pino.pretty({
  forceColor: true
});
pretty.pipe(process.stdout);

const logger = pino({
  name: 'P-API',
  level: config.debug ? 'debug' : 'info',
  safe: true
}, pretty);

export default logger;
