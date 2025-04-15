import { Transaction } from "sequelize";
import { Tickets } from "../../domain/entities/Tickets";
import { TicketRepository } from "../../domain/repositories/ticketRepository";
import { TicketsModel } from "../db/models/TicketsModel";
import { TicketMapper } from "../mappers/TicketMapper";

export class TicketRepositorySequelize implements TicketRepository {
  async save(ticket: Tickets, transaction?: Transaction): Promise<Tickets> {
    try {
      const createdUser = await TicketsModel.create(
        TicketMapper.toPersistence(ticket), { transaction }
      );

      return TicketMapper.toDomain(createdUser);
    } catch (error) {
      console.error("Error al guardar el ticket:", error);
      throw new Error("No se pudo guardar el ticket");
    }
  }

  async findById(id: string): Promise<Tickets | null> {
    try {
      const ticketModel = await TicketsModel.findOne({ where: { id } });

      if (!ticketModel) return null;

      return TicketMapper.toDomain(ticketModel);
    } catch (error) {
      console.error("Ocurrio un error:", error);
      throw new Error("No se pudo encontrar al ticket");
    }
  }
}
