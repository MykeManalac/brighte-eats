import { LeadService } from "../services/leadService.js";
import type { Lead, ServiceType } from "@prisma/client";

const leadService = new LeadService();

export const resolvers = {
  Query: {
    leads: async (): Promise<Lead[]> => {
      return leadService.getLeads();
    },

    lead: async (_: any, params: { id: string }): Promise<Lead | null> => {
      return leadService.getLeadById(params.id);
    },
  },

  Mutation: {
    register: async (
      _: any,
      params: {
        name: string;
        email: string;
        mobile: string;
        postcode: string;
        services: ServiceType;
      },
    ): Promise<Lead> => {
      return leadService.createLead(params);
    },
  },
};
