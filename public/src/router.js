import {createRouter,createWebHashHistory} from 'vue-router'
// import { from } from "core-js/fn/array"

const routes = [
    {
        path:'/',component: () =>import('./components/Index.vue')
    },
    {
        path:'/index',component: () =>import('./components/Index.vue')
    },
    {
        path:'/test',component: () =>import('./components/Test.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });
export default router