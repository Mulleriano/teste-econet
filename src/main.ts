import { createApp } from "vue";
import { createPinia } from "pinia";
import { registerPlugins } from "@/plugins";
import App from "./App.vue";
import { router } from "./routes";
import "unfonts.css";

const app = createApp(App);
const pinia = createPinia();

registerPlugins(app);
app.use(router);
app.use(pinia);
app.mount("#app");
