import { Points } from "../../../domain/entities/Points";
import { Tickets } from "../../../domain/entities/Tickets";
import { TicketRepository } from "../../../domain/repositories/ticketRepository";
import { UserRepository } from "../../../domain/repositories/userRepository";
import { PointRepository } from "../../../domain/repositories/pointRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class CreateTicket<T> {
  constructor(
    private ticketRepository: TicketRepository,
    private userRepository: UserRepository,
    private pointRepository: PointRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(ticket: Tickets): Promise<Tickets> {
    return await this.uow.runInTransaction(async (transaction) => {
      const [foundTicket, foundUser] = await Promise.all([
        this.ticketRepository.findById(ticket.id, transaction),
        this.userRepository.findById(ticket.user_id, transaction),
      ]);

      if (foundTicket) throw new Error("Ticket ya reclamado");
      if (!foundUser) throw new Error("Usuario no existe");

      const newTicket = new Tickets(
        ticket.id,
        ticket.user_id,
        ticket.store_id,
        ticket.amount_spent
      );

      const newPoints = new Points(newTicket.user_id, newTicket.points_earned);

      await this.pointRepository.save(newPoints, transaction);
      return await this.ticketRepository.save(newTicket, transaction);
    });
  }
}
