import { Tickets } from "../../domain/entities/Tickets";
import { isMapperClass } from "../../domain/mapper";
import { StoresModel, TicketsModel } from "../db/models";

export class TicketMapper {
  static toDomain(ticketsModel: TicketsModel): Tickets {
    const store = ticketsModel.get("store") as StoresModel;
    const ticket = ticketsModel.get() as TicketsModel;

    return {
      id: ticket.id,
      user_id: ticket.user_id,
      store_id: ticket.store_id,
      amount_spent: ticket.amount_spent,
      points_earned: ticket.points_earned,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
      store: store ? store : undefined,
    } as Tickets;
  }

  static toPersistence(ticket: Tickets): Partial<TicketsModel> {
    return {
      id: ticket.id,
      user_id: ticket.user_id,
      store_id: ticket.store_id,
      amount_spent: ticket.amount_spent,
      points_earned: ticket.points_earned,
    };
  }
}

isMapperClass<Tickets, TicketsModel>(TicketMapper);
