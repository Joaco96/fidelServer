import { Request, Response } from "express";
import { CreateUser } from "../../application/use-cases/Users/CreateUser";
import { UserRepositorySequelize } from "../../infrastructure/repositories/UserRepositorySequelize";
import { LoginUser } from "../../application/use-cases/Users/LoginUser";

const userRepository = new UserRepositorySequelize();
const createUser = new CreateUser(userRepository);
const loginUser = new LoginUser(userRepository);

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

  static async login(req: Request, res: Response) {
    try {
      const userToken = await loginUser.execute(
        req.body.email,
        req.body.password
      );
      res.status(200).json({ message: "Ingreso exitoso", token: userToken });
    } catch (error) {
      res.status(400).json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }
}
