import Vue from "vue";

import config from "./config";
import makeCrudModule from "./store/crud";
import makeCrudRoutes from "./router/crud";
import makeService from "./services/api";
import router from "./router";
import store from "./store";

import App from "./App.vue";
import FormContainer from "./components/FormContainer.vue";
import ListingContainer from "./components/ListingContainer.vue";

import axios from "axios";
Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({
  baseURL: "http://178.170.206.10:999/core/api",
  timeout: 30000,
  params: {}
});

const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Token"] = token;
}

config.contentTypes.forEach(contentType => {
  // Register dynamically generated store modules.
  store.registerModule(
    contentType.name,
    makeCrudModule({
      service: makeService(contentType.endpoint)
    })
  );

  // Register dynamically generated routes.
  router.addRoutes(
    makeCrudRoutes({
      components: {
        FormContainer,
        ListingContainer
      },
      contentType
    })
  );
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
