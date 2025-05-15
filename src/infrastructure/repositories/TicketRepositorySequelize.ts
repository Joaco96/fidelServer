import { Transaction } from "sequelize";
import { Tickets } from "../../domain/entities/Tickets";
import { TicketRepository } from "../../domain/repositories/ticketRepository";
import { TicketMapper } from "../mappers/TicketMapper";
import { StoresModel, TicketsModel } from "../db/models";

export class TicketRepositorySequelize implements TicketRepository {
  async save(ticket: Tickets, transaction?: Transaction): Promise<Tickets> {
    try {
      const createdUser = await TicketsModel.create(
        TicketMapper.toPersistence(ticket),
        { transaction }
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

      return ticketModel ? TicketMapper.toDomain(ticketModel) : null;
    } catch (error) {
      console.error("Ocurrio un error:", error);
      throw new Error("No se pudo encontrar al ticket");
    }
  }

  async findAll(
    transaction?: Transaction,
    filters: Partial<Tickets> = {}
  ): Promise<Array<Tickets>> {
    try {
      const foundTickets = await TicketsModel.findAll({
        where: filters,
        transaction,
        attributes: { exclude: ["password"] },
        include: [{ model: StoresModel, as: "store" }],
      });

      return foundTickets.length
        ? foundTickets.map((fr) => TicketMapper.toDomain(fr))
        : [];
    } catch (error) {
      console.error("Error al buscar los tickets con filtros:", error);
      throw new Error("No se pudieron encontrar los tickets");
    }
  }
}
