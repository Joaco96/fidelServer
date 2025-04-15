import { Request, Response } from "express";
import { TicketRepositorySequelize } from "../../infrastructure/repositories/TicketRepositorySequelize";
import { CreateTicket } from "../../application/use-cases/Tickets/CreateTicket";
import { UserRepositorySequelize } from "../../infrastructure/repositories/UserRepositorySequelize";
import { PointRepositorySequelize } from "../../infrastructure/repositories/PointRepositorySequelize";
import { SequelizeUnitOfWork } from "../../infrastructure/transactions/SequelizeUnitOfWork";
import { sequelize } from "../../infrastructure/db/sequelize";

const ticketRepository = new TicketRepositorySequelize();
const userRepository = new UserRepositorySequelize();
const pointRepository = new PointRepositorySequelize();
const unitOfWork = new SequelizeUnitOfWork(sequelize);
const createTicket = new CreateTicket(ticketRepository,userRepository,pointRepository, unitOfWork);

export class TicketController {
  static async create(req: Request, res: Response) {
    const createdTicket = await createTicket.execute(req.body);
    res
      .status(201)
      .sendResponse({ message: "Ticket creado con éxito", points_earned: createdTicket.points_earned });
  }
}
