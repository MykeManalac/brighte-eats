import type { ServiceType } from "@prisma/client";

export interface RegisterLeadArg {
  name: string;
  email: string;
  mobile: string;
  postcode: string;
  services: ServiceType;
}
