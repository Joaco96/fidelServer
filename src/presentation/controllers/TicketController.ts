import { Request, Response } from "express";
import { TicketRepositorySequelize } from "../../infrastructure/repositories/TicketRepositorySequelize";
import { CreateTicket } from "../../application/use-cases/Tickets/CreateTicket";
import { UserRepositorySequelize } from "../../infrastructure/repositories/UserRepositorySequelize";
import { PointRepositorySequelize } from "../../infrastructure/repositories/PointRepositorySequelize";
import { SequelizeUnitOfWork } from "../../infrastructure/transactions/SequelizeUnitOfWork";
import { sequelize } from "../../infrastructure/db/sequelize";
import { GetTickets } from "../../application/use-cases/Tickets/GetTicket";

const ticketRepository = new TicketRepositorySequelize();
const userRepository = new UserRepositorySequelize();
const pointRepository = new PointRepositorySequelize();
const unitOfWork = new SequelizeUnitOfWork(sequelize);
const createTicket = new CreateTicket(
  ticketRepository,
  userRepository,
  pointRepository,
  unitOfWork
);
const getTickets = new GetTickets(ticketRepository, unitOfWork);

export class TicketController {
  static async create(req: Request, res: Response) {
    const createdTicket = await createTicket.execute(req.body);
    res
      .status(201)
      .sendResponse({
        message: "Ticket creado con éxito",
        points_earned: createdTicket.points_earned,
      });
  }

  static async getTickets(req: Request, res: Response) {
    const tickets = await getTickets.execute(req.query);
    res.status(200).sendResponse(tickets);
  }
}
