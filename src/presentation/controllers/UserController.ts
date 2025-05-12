import { Request, Response } from "express";
import { CreateUser } from "../../application/use-cases/Users/CreateUser";
import { UserRepositorySequelize } from "../../infrastructure/repositories/UserRepositorySequelize";
import { LoginUser } from "../../application/use-cases/Users/LoginUser";
import { SequelizeUnitOfWork } from "../../infrastructure/transactions/SequelizeUnitOfWork";
import { sequelize } from "../../infrastructure/db/sequelize";
import { GetUsers } from "../../application/use-cases/Users/GetUsers";
import { DeleteUser } from "../../application/use-cases/Users/DeleteUser";

const userRepository = new UserRepositorySequelize();
const unitOfWork = new SequelizeUnitOfWork(sequelize);
const createUser = new CreateUser(userRepository, unitOfWork);
const loginUser = new LoginUser(userRepository, unitOfWork);
const getUsers = new GetUsers(userRepository, unitOfWork);
const deleteUser = new DeleteUser(userRepository, unitOfWork);

export class UserController {
  static async create(req: Request, res: Response) {
    const createdUser = await createUser.execute(req.body);
    res
      .status(201)
      .sendResponse({
        message: "Usuario creado con éxito",
        id: createdUser.id,
      });
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

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await deleteUser.execute(id);
    res.status(200).sendResponse([]);
  }

  static async getAllUsers(req: Request, res: Response) {
    const users = await getUsers.execute(req.query);
    res.status(200).sendResponse(users);
  }
}
