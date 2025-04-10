import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../../types/apiResponse';

export const responseFormatter = (_req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;

  res.sendResponse = function <T = any>(data: T) {
    const success = res.statusCode < 400;

    const response: ApiResponse<T> = {
      success,
      message: res.locals.message || (success ? 'Solicitud exitosa' : 'Ocurrió un error'),
      data: success ? data : null,
      error: !success ? (data as any) : null,
      statusCode: res.statusCode,
    };

    return originalSend.call(this, response);
  };

  next();
};