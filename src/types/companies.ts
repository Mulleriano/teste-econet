export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
}

export type Company = {
  id: number;
  name: string;
  cnpj: string;
  active: boolean;
  employees: Employee[];
};
