import { Tickets } from "../../domain/entities/Tickets";
import { isMapperClass } from "../../domain/mapper";
import { TicketsModel } from "../db/models/TicketsModel";

export class TicketMapper {
  static toDomain(ticketsModel: TicketsModel): Tickets {
    const { id, user_id, store_id, amount_spent, points_earned } =
      ticketsModel.get();
    return {
      id,
      user_id,
      store_id,
      amount_spent,
      points_earned,
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
