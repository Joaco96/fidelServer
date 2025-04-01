import { Request, Response } from "express";
import { CreateUser } from "../../application/use-cases/Users/CreateUser";
import { UserRepositorySequelize } from "../../infrastructure/repositories/UserRepositorySequelize";

const userRepository = new UserRepositorySequelize();
const createUser = new CreateUser(userRepository);

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const createdUser = await createUser.execute(req.body);
      res
        .status(201)
        .json({ message: "Usuario creado con éxito", id: createdUser.id });
    } catch (error) {
      res.status(400).json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }
}
