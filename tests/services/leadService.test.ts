import { LeadService } from "../../src/services/leadService";
import prisma from "../../src/prisma";
import { logger } from "../../src/utils/logger";
import LeadError from "../../src/errors/leadError";
import { LEAD_ERRORS, ERROR_CODES } from "../../src/constants/constants";
import {
  mockLead,
  mockLeads,
  mockRegisterLeadData,
} from "../fixtures/leadFixtures";
import { Lead } from "@prisma/client";

jest.mock("../../src/prisma", () => ({
  lead: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("../../src/utils/logger", () => ({
  logger: {
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

describe("LeadService", () => {
  let service: LeadService;

  beforeEach(() => {
    service = new LeadService();
    jest.clearAllMocks();
  });

  describe("getLeads", () => {
    it("should return leads successfully", async () => {
      (prisma.lead.findMany as jest.Mock).mockResolvedValue(mockLeads);

      const result = await service.getLeads();
      expect(result).toEqual(mockLeads);
      expect(prisma.lead.findMany).toHaveBeenCalled();
    });

    it("should throw LeadError on prisma failure", async () => {
      const error = new Error("DB fail");
      (prisma.lead.findMany as jest.Mock).mockRejectedValue(error);

      await expect(service.getLeads()).rejects.toThrow(LeadError);
      expect(logger.error).toHaveBeenCalledWith(error);
    });
  });

  describe("getLeadById", () => {
    it("should return lead successfully", async () => {
      (prisma.lead.findUnique as jest.Mock).mockResolvedValue(mockLead);

      const result = await service.getLeadById("1");
      expect(result).toEqual(mockLead);
      expect(prisma.lead.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
    });

    it("should throw LeadError with NOT_FOUND if lead does not exist", async () => {
      (prisma.lead.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.getLeadById("999")).rejects.toThrow(LeadError);
      await expect(service.getLeadById("999")).rejects.toMatchObject({
        message: LEAD_ERRORS.GET_LEAD,
        code: ERROR_CODES.NOT_FOUND,
      });
    });

    it("should throw LeadError with INTERNAL_SERVER_ERROR on prisma failure", async () => {
      const error = new Error("DB fail");
      (prisma.lead.findUnique as jest.Mock).mockRejectedValue(error);

      await expect(service.getLeadById("1")).rejects.toThrow(LeadError);
      expect(logger.error).toHaveBeenCalledWith(error);
    });
  });

  describe("createLead", () => {
    it("should create lead successfully", async () => {
      const mockLead = {
        id: "2",
        ...mockRegisterLeadData,
      };
      (prisma.lead.create as jest.Mock).mockResolvedValue(mockLead);

      const result = await service.createLead(mockRegisterLeadData);
      expect(result).toEqual(mockLead);
      expect(prisma.lead.create).toHaveBeenCalledWith({
        data: mockRegisterLeadData,
      });
    });

    it("should throw LeadError on prisma failure", async () => {
      const error = new Error("DB fail");
      (prisma.lead.create as jest.Mock).mockRejectedValue(error);

      await expect(service.createLead(mockRegisterLeadData)).rejects.toThrow(
        LeadError,
      );
      expect(logger.error).toHaveBeenCalledWith(error);
    });

    it("should not allow invalid service enum value", async () => {
      const invalidPayload = {
        ...mockRegisterLeadData,
        services: "INVALID_SERVICE",
      };

      (prisma.lead.create as jest.Mock).mockRejectedValue(
        new Error("Invalid Service"),
      );

      await expect(service.createLead(invalidPayload as Lead)).rejects.toThrow(
        LeadError,
      );
    });
  });
});
