import {createApp} from 'vue'
import App from './src/App.vue'
import router from "./src/router";
// import viewUI from './lib/iview-ui'
// import './lib/iview-ui.css'
// import stroe from './store/store'
createApp(App).use(router).mount('#root')