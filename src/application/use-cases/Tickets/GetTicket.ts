import { Tickets } from "../../../domain/entities/Tickets";
import { TicketRepository } from "../../../domain/repositories/ticketRepository";
import { UnitOfWork } from "../../../domain/transaction";

export class GetTickets<T> {
  constructor(
    private ticketRepository: TicketRepository,
    private uow: UnitOfWork<T>
  ) {}

  async execute(filters: Partial<Tickets>): Promise<Tickets[]> {
    return await this.uow.runInTransaction(async (transaction) => {
      return await this.ticketRepository.findAll(transaction, filters);
    });
  }
}