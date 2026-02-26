import { createApp } from "vue";
import { createUnhead } from "@unhead/vue";
import App from "./App.vue";

const app = createApp(App);

const head = createUnhead();
app.use(head);
app.config.productionTip = false;

app.mount("#app");
