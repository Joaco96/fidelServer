import { Tickets } from "../entities/Tickets";

export interface TicketRepository<TTx = unknown>  {
  findById(id: string, transaction: TTx): Promise<Tickets | null>;
  findAll(transaction: TTx, filters?: Partial<Tickets>): Promise<Array<Tickets>>;
  save(ticket: Tickets, transaction: TTx): Promise<Tickets>;
}
