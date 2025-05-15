import { Request, Response } from "express";
import { CreateUser } from "../../application/use-cases/Users/CreateUser";
import { UserRepositorySequelize } from "../../infrastructure/repositories/UserRepositorySequelize";
import { LoginUser } from "../../application/use-cases/Users/LoginUser";
import { SequelizeUnitOfWork } from "../../infrastructure/transactions/SequelizeUnitOfWork";
import { sequelize } from "../../infrastructure/db/sequelize";
import { GetUsers } from "../../application/use-cases/Users/GetUsers";
import { DeleteUser } from "../../application/use-cases/Users/DeleteUser";
import { RoleIds } from "../../domain/entities/Role";
import { RequestWithUser } from "../../infrastructure/middlewares/authMiddleware";
import { UpdateUser } from "../../application/use-cases/Users/UpdateUser";
import { GetUserById } from "../../application/use-cases/Users/GetUserById";

const userRepository = new UserRepositorySequelize();
const unitOfWork = new SequelizeUnitOfWork(sequelize);
const createUser = new CreateUser(userRepository, unitOfWork);
const loginUser = new LoginUser(userRepository, unitOfWork);
const getUsers = new GetUsers(userRepository, unitOfWork);
const deleteUser = new DeleteUser(userRepository, unitOfWork);
const updateUser = new UpdateUser(userRepository, unitOfWork);
const getUserById = new GetUserById(userRepository, unitOfWork);

export class UserController {
  static async create(req: Request, res: Response) {
    const createdUser = await createUser.execute(req.body);
    res.status(201).sendResponse({
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

  static async delete(req: RequestWithUser, res: Response) {
    const { id } = req.params;
    const isAdmin = req.user?.role === RoleIds.ADMIN;
    const isSameUser = req.user?.userId === id;
    if (!isAdmin && !isSameUser) {
      throw new Error("No puedes realizar esta operación");
    }
    await deleteUser.execute(id);
    res.status(200).sendResponse([]);
  }

  static async getAllUsers(req: Request, res: Response) {
    const users = await getUsers.execute(req.query);
    res.status(200).sendResponse(users);
  }

  static async update(req: RequestWithUser, res: Response) {
    const { id } = req.params;
    const isAdmin = req.user?.role === RoleIds.ADMIN;
    const isSameUser = req.user?.userId === id;
    if (!isAdmin && !isSameUser) {
      throw new Error("No puedes realizar esta operación");
    }
    const updatedUser = await updateUser.execute(id, req.body);
    res.status(200).sendResponse(updatedUser);
  }

  static async updateRole(req: RequestWithUser, res: Response) {
    const { id } = req.params;
    const { role_id } = req.body;

    const validRole = Object.values(RoleIds).includes(role_id);
    if (!validRole) throw new Error("Rol inválido");
    
    const updatedUser = await updateUser.execute(id, req.body);
    res.status(200).sendResponse(updatedUser);
  }

  static async getUserPoints(req: RequestWithUser, res: Response) {
    const { id } = req.params;
    const isAdmin = req.user?.role === RoleIds.ADMIN;
    const isSameUser = req.user?.userId === id;
    if (!isAdmin && !isSameUser) {
      throw new Error("No puedes realizar esta operación");
    }
    const user = await getUserById.execute(id);
    res.status(200).sendResponse({ points_balance: user?.points_balance });
  }
}
