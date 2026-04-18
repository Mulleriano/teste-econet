import { defineStore } from "pinia";
import { api } from "@/api/api";
import type { Company, Employee } from "@/types/companies";
import resetStatus from "@/utils/resetStatus";

interface CompanyState {
  companies: Company[];
  companySelected: Company | null;
  loading: boolean;
  status: {
    message: string | null;
    type: "error" | "success" | null;
  };
}

export const useCompanyStore = defineStore("company", {
  state: (): CompanyState => ({
    companies: [],
    companySelected: null,
    loading: false,
    status: {
      message: null,
      type: null,
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

    selectedCompany(id: number) {
      this.companySelected = this.companies.find((e) => e.id === id) || null;
      return this.companySelected;
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
