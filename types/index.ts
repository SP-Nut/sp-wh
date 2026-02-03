export type { Database } from "./database";

export interface NavLink {
  href: string;
  label: string;
}

export interface WarehouseSize {
  id: string;
  name: string;
  slug: string;
  minSize: number;
  maxSize: number | null;
}

export interface Stat {
  label: string;
  value: string;
  suffix: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ContactFormData {
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  address?: string;
  lineId?: string;
  warehouseSize?: string;
  message?: string;
}
