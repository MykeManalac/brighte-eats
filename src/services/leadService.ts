import prisma from "../prisma.js";
import type { Lead, ServiceType } from "@prisma/client";

export class LeadService {
  async getLeads(): Promise<Lead[]> {
    return prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async getLeadById(id: string): Promise<Lead | null> {
    return prisma.lead.findUnique({
      where: { id },
    });
  }

  async createLead(data: {
    name: string;
    email: string;
    mobile: string;
    postcode: string;
    services: ServiceType;
  }): Promise<Lead> {
    return prisma.lead.create({
      data,
    });
  }
}
