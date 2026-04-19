export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
}

export type Company = {
  id: string;
  name: string;
  cnpj: string;
  active: boolean;
  employees: Employee[];
};
