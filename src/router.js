import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from './views/RegisterPage.vue'
import AddressListPage from './views/AddressListPage.vue'
const routes = [
  { path: '/', component: RegisterPage },
  { path: '/addresses', name: 'addressListPage', component: AddressListPage },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
