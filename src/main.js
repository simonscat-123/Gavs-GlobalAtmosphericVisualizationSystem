import { createApp } from 'vue';
// import { Layout, Button, List, Pagination } from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(store)
  .use(router)
  // .use(Layout)
  // .use(Button)
  // .use(List)
  // .use(Pagination)
  .mount('#app');
