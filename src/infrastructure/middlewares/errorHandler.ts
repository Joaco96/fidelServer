import { Response, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

// Extender la interfaz Response
export interface ResponsetWithSenderMethod extends Response {
  sendResponse: <T = any>(data: T) => this;
}

export const errorHandler: ErrorRequestHandler  = (err, _req, res, _next) => {
  let statusCode = 500;
  let message = 'Error interno del servidor';
  let errorDetails: any = err instanceof Error ? {message: err.message} : err;

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Error de validación';
    errorDetails = err.flatten().fieldErrors;
  }

  res.locals.message = message;

  if (typeof (res as ResponsetWithSenderMethod).sendResponse === 'function') {
    (res as ResponsetWithSenderMethod).status(statusCode).sendResponse(errorDetails);
  } else {
    res.status(statusCode).json({
      success: false,
      message,
      error: errorDetails,
      data: null,
      statusCode,
    });
  }
};