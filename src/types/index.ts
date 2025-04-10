import 'express';
import { CustomJwtPayload } from "../domain/services/jwtService";

declare module 'express' {
  export interface Response {
    sendResponse: <T = any>(data: T) => this;
    user?: CustomJwtPayload;
  }
}

declare module 'express-serve-static-core' {
  export interface Response {
    sendResponse<T = any>(data: T): this;
    user?: CustomJwtPayload;
  }
}