import prisma from "../prisma.js";
import { type Lead } from "@prisma/client";
import { logger } from "../utils/logger.js";
import type { RegisterLeadArg } from "../types/lead.js";
import LeadError from "../errors/leadError.js";
import { LEAD_ERRORS, ERROR_CODES } from "../constants/constants.js";

export class LeadService {
  async getLeads(): Promise<Lead[]> {
    try {
      return await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (error: unknown) {
      logger.error(error);
      throw new LeadError(
        LEAD_ERRORS.GET_LEADS,
        ERROR_CODES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLeadById(id: string): Promise<Lead | null> {
    try {
      const lead: Lead | null = await prisma.lead.findUnique({
        where: { id },
      });
      if (!lead) {
        throw new LeadError(LEAD_ERRORS.GET_LEAD, ERROR_CODES.NOT_FOUND);
      }
      return lead;
    } catch (error: unknown) {
      logger.error(error);
      throw new LeadError(
        LEAD_ERRORS.GET_LEAD,
        error instanceof LeadError
          ? error.code || ERROR_CODES.INTERNAL_SERVER_ERROR
          : ERROR_CODES.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createLead(data: RegisterLeadArg): Promise<Lead> {
    try {
      logger.debug(`Saving new Lead , Payload : ${JSON.stringify(data)}`);
      return await prisma.lead.create({
        data,
      });
    } catch (error: unknown) {
      logger.error(error);
      throw new LeadError(
        LEAD_ERRORS.REGISTER_LEAD,
        ERROR_CODES.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
