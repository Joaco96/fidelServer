import morgan from 'morgan';
import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';

const colorMethod = (method: string) => {
  switch (method) {
    case 'GET': return chalk.green(method);
    case 'POST': return chalk.yellow(method);
    case 'PUT':
    case 'PATCH': return chalk.blue(method);
    case 'DELETE': return chalk.red(method);
    default: return chalk.white(method);
  }
};

const colorStatus = (status: number) => {
  if (status >= 500) return chalk.red(status.toString());
  if (status >= 400) return chalk.redBright(status.toString());
  if (status >= 300) return chalk.cyan(status.toString());
  if (status >= 200) return chalk.greenBright(status.toString());
  return chalk.white(status.toString());
};

const colorResponseTime = (time: string) => {
  const num = parseFloat(time);
  return num > 50 ? chalk.red(`(${time}ms)`) : chalk.gray(`(${time}ms)`);
};

morgan.token('colored-method', req => colorMethod(req.method ?? ''));
morgan.token('colored-status', (_req, res) => colorStatus(res.statusCode));
morgan.token('colored-response-time', (_req, res: Response) => {
  const time = res.locals.responseTime ?? '0';
  return colorResponseTime(time);
});

const customFormat = ':colored-method :url :colored-status :colored-response-time';
export default morgan(customFormat);

export const responseTimeHeader = (_req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const durationInMs = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(1);
    res.locals.responseTime = durationInMs;
  });

  next();
};
