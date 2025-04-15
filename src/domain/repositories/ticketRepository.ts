import { Tickets } from "../entities/Tickets";

export interface TicketRepository<TTx = unknown>  {
  findById(id: string, transaction: TTx): Promise<Tickets | null>;
  save(ticket: Tickets, transaction: TTx): Promise<Tickets>;
}
