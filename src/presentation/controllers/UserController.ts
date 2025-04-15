import { Request, Response } from "express";
import { CreateUser } from "../../application/use-cases/Users/CreateUser";
import { UserRepositorySequelize } from "../../infrastructure/repositories/UserRepositorySequelize";
import { LoginUser } from "../../application/use-cases/Users/LoginUser";
import { SequelizeUnitOfWork } from "../../infrastructure/transactions/SequelizeUnitOfWork";
import { sequelize } from "../../infrastructure/db/sequelize";

const userRepository = new UserRepositorySequelize();
const unitOfWork = new SequelizeUnitOfWork(sequelize);
const createUser = new CreateUser(userRepository, unitOfWork);
const loginUser = new LoginUser(userRepository, unitOfWork);

export class UserController {
  static async create(req: Request, res: Response) {
    const createdUser = await createUser.execute(req.body);
    res
      .status(201)
      .sendResponse({ message: "Usuario creado con éxito", id: createdUser.id });
  }

  static async login(req: Request, res: Response) {
    const userToken = await loginUser.execute(
      req.body.email,
      req.body.password
    );
    res
      .status(200)
      .sendResponse({ message: "Ingreso exitoso", token: userToken });
  }
}
