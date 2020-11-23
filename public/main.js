import {createApp} from 'vue'
import App from './src/App.vue'
import router from "./src/router";
// import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';
// import stroe from './store/store'
createApp(App).use(router).mount('#root')