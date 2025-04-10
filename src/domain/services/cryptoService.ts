import bcrypt from "bcrypt";

export const hashPassword = (plain: string) => bcrypt.hash(plain, 10);
export const comparePasswords = (plain: string, hash: string) =>
  bcrypt.compare(plain, hash);
