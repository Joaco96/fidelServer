export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T | null;
  error: ApiError | null;
  statusCode: number;
}

export type ApiError =
  | string
  | { message: string; [key: string]: string | string[]  }
  | import("zod").ZodError;