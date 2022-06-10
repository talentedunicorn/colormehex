import { createApp } from "vue";
import { createMetaManager } from "vue-meta";
import App from "./App.vue";
import "./registerServiceWorker";

const app = createApp(App).use(createMetaManager());
app.config.productionTip = false;

app.mount("#app");
