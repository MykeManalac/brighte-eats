import { ServiceType } from "@prisma/client";

export const mockLeads = [
  {
    id: "aaa-bbb-1234",
    name: "John",
    email: "John@gmail.com",
    mobile: "012345678",
    postcode: "1001",
    services: "DELIVERY",
    createdAt: new Date(),
  },
];

export const mockLead = {
  id: "aaa-bbb-1234",
  name: "John",
  email: "John@gmail.com",
  mobile: "012345678",
  postcode: "1001",
  services: "DELIVERY",
  createdAt: new Date(),
};

export const mockRegisterLeadData = {
  name: "Jane",
  email: "j@b.com",
  mobile: "456",
  postcode: "2222",
  services: "PAYMENT" as ServiceType,
};
