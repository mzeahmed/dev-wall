/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

import router from "@/router";

const app = createApp(App);

app.use(router);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

registerPlugins(app);

app.mount("#app");
