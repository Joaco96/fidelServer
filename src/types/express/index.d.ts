// src/types/express/index.d.ts
import { User } from "../../domain/entities/User";
import { CustomJwtPayload } from "../../domain/services/jwtService";

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}
