import { defineStore } from "pinia";
import { api } from "@/api/api";
import type { Company, Employee } from "@/types/companies";
import type { Status } from "@/types/status";
import resetStatus from "@/utils/resetStatus";

interface CompanyState {
  companies: Company[];
  companySelected: Company | null;
  loading: boolean;
  status: Status;
}

export const useCompanyStore = defineStore("company", {
  state: (): CompanyState => ({
    companies: [],
    companySelected: {
      id: 0,
      name: "",
      cnpj: "",
      active: true,
      employees: [],
    },
    loading: false,
    status: {
      message: "",
      type: undefined,
    },
  }),

  actions: {
    async searchCompanies(): Promise<void> {
      this.loading = true;
      this.status = resetStatus();

      try {
        const response = await api.get("/companies");
        this.companies = response.data.map((company: any) => ({
          id: company.id,
          name: company.name,
          cnpj: company.cnpj,
          active: company.active,
          employees: company.employees,
        }));
      } catch (err) {
        this.companies = [];
        this.status = { message: "Erro ao carregar empresas", type: "error" };
      } finally {
        this.loading = false;
      }
    },

    async selectedCompany(id: number): Promise<void> {
      this.loading = true;
      this.status = resetStatus();
      try {
        const response = await api.get(`/companies/${id}`);
        const company = response.data;
        this.companySelected = company;
      } catch (err) {
        this.status = { message: "Erro ao carregar empresa", type: "error" };
      } finally {
        this.loading = false;
      }
    },

    async createCompany(company: Company): Promise<void> {
      this.loading = true;
      this.status = resetStatus();
      try {
        const response = await api.post("/companies", company);
        const newCompany = response.data;

        this.companies.push({ ...newCompany, employees: [] });
        this.status = {
          message: "Empresa criada com sucesso",
          type: "success",
        };
      } catch (err) {
        this.status = { message: "Erro ao criar empresa", type: "error" };
      } finally {
        this.loading = false;
        setTimeout(() => {
          this.status = resetStatus();
        }, 3000);
      }
    },

    async updateCompany(company: Company): Promise<void> {
      this.loading = true;
      this.status = resetStatus();
      try {
        const response = await api.put(`/companies/${company.id}`, company);
        const updatedCompany = response.data;
        const index = this.companies.findIndex((e) => e.id === company.id);
        if (index !== -1) {
          this.companies[index] = {
            ...updatedCompany,
            employees: this.companies[index].employees,
          };
        }
        this.companySelected = updatedCompany;

        this.status = {
          message: "Empresa atualizada com sucesso",
          type: "success",
        };
      } catch (err) {
        this.status = { message: "Erro ao atualizar empresa", type: "error" };
      } finally {
        this.loading = false;
        setTimeout(() => {
          this.status = resetStatus();
        }, 3000);
      }
    },

    async deleteCompany(id: number): Promise<void> {
      this.loading = true;
      this.status = resetStatus();
      try {
        await api.delete(`/companies/${id}`);
        this.companies = this.companies.filter((e) => e.id !== id);
        if (this.companySelected?.id === id) this.companySelected = null;
        this.status = {
          message: "Empresa deletada com sucesso",
          type: "success",
        };
      } catch (err) {
        this.companySelected = null;
        this.status = { message: "Erro ao deletar empresa", type: "error" };
      } finally {
        this.loading = false;
        setTimeout(() => {
          this.status = resetStatus();
        }, 3000);
      }
    },

    addEmployee(employee: Employee) {
      if (!this.companySelected) return;

      this.companySelected.employees.push(employee);
    },

    deleteEmployee(index: number) {
      if (!this.companySelected) return;

      this.companySelected.employees.splice(index, 1);
    },
  },
});
