import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import './styles/index.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from './utils/axios'
import VxeUIAll from 'vxe-pc-ui'
import 'vxe-pc-ui/es/style.css'

import VxeUITable from 'vxe-table'
import 'vxe-table/es/style.css'
import '../111.ts'
import Login from '../111.ts'


const login = new Login('admin', '123456')
let key = Reflect.ownKeys(login)
let key2 = Object.getOwnPropertySymbols(login)
console.log('🚀 ~ login:', login )
console.log('import.meta.env', import.meta.env)
login.checkPassword('123456')  // true

console.log('🚀 ~ login.PASSWORD:', login.PASSWORD)
const app = createApp(App)
const pinia = createPinia()

// 确保在挂载应用之前注册 Pinia
app.use(pinia)

//注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  // console.log(key)
  app.component(key, component)
}
console.log(window.__VUE_DEVTOOLS_GLOBAL_HOOK__) // 应该存在
// console.log(app.version) 
// console.log('🚀 ~ process.env:', process.env)

console.log('🚀 ~ app.version:', app.version)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$globalMethod = () => 'Global Method';
app.config.globalProperties.$api = {
  getExampleData: () => axios.get('/'),
  postExampleData: (data) => axios.post('/table-data', data),
}
// 强制设置开发模式
app.config.devtools = true
app.use(ElementPlus, {
  locale: zhCn,
})


app.use(VxeUIAll).use(VxeUITable).mount('#app')

