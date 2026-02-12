import { ApolloError } from "apollo-server";
import { LeadService } from "../services/leadService.js";
import type { Lead } from "@prisma/client";
import type { RegisterLeadArg } from "../types/lead.js";
import LeadError from "../errors/leadError.js";

const leadService = new LeadService();

export const resolvers = {
  Query: {
    leads: async (): Promise<Lead[]> => {
      try {
        return await leadService.getLeads();
      } catch (error: unknown) {
        const leadError = error as LeadError;
        throw new ApolloError(leadError.message, leadError.code);
      }
    },

    lead: async (_: unknown, args: { id: string }): Promise<Lead | null> => {
      try {
        return await leadService.getLeadById(args.id);
      } catch (error: unknown) {
        const leadError = error as LeadError;
        throw new ApolloError(leadError.message, leadError.code);
      }
    },
  },

  Mutation: {
    registerLead: async (
      _: unknown,
      args: {
        lead: RegisterLeadArg;
      },
    ): Promise<Lead> => {
      try {
        return await leadService.createLead(args.lead);
      } catch (error: unknown) {
        const leadError = error as LeadError;
        throw new ApolloError(leadError.message, leadError.code);
      }
    },
  },
};
