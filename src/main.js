import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Router setup
import store from "./store"; // Vuex setup
import "@/assets/styles/tailwind.css"; // Import Tailwind CSS

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
