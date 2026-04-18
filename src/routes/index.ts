import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/layouts/Dashboard.vue";
import CompanyList from "@/views/CompanyList.vue";
import CompanyDetail from "../views/CompanyDetail.vue";
import EditCompany from "../views/EditCompany.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: "/",
          name: "Listagem",
          component: CompanyList,

        },
        {
          path: "/detail/:id",
          name: "Detalhes",
          component: CompanyDetail,
        },
        {
          path: "/edit/:id",
          name: "Editar",
          component: EditCompany,
        },
      ],
    },
  ],
});
