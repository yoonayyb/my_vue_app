<script setup >
import HelloWorld from './components/HelloWorld.vue'
import icon from './components/icon.vue'
import stroke from './components/stroke.vue';
import TableComponent from './components/TableComponent.vue';
import Test_HelloWorld from './components/test_HelloWorld.vue'
import LoginPage from './views/LoginPage.vue';
import { ref, computed, shallowRef, reactive } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useDark, useToggle } from '@vueuse/core'
import 'element-plus/theme-chalk/display.css'
import { set } from 'xe-utils';
import { getCurrentInstance } from 'vue';
const instance = getCurrentInstance()
instance.appContext.config.globalProperties.$api.postExampleData()
console.log("🚀 ~ instance11111111:", )
const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
}

const state = shallowRef({
  user: {
    profile: {
      name: 'John',
      age: 30,
    },
  },
});

// 只有 state.user.profile 是响应式的，内部的 name 和 age 不是响应式的
state.value.user.profile= 'Doe'
console.log('state.user.profile.name',state);
// shallowRef 示例
const shallowValue = ref({
  count: 0,
  nested: {
    value: 'hello'
  }
})

// 只有直接替换 .value 才会触发更新
// shallowValue.value.count++  // 不会触发更新
// shallowValue.value.nested.value = 'world'  // 不会触发更新
// shallowValue.value = { count: 1 }  // 触发更新
console.log("🚀 ~ shallowValue:", shallowValue)


// 初始化暗黑模式状态
const isDark = useDark()
const toggleDark = useToggle(isDark)
const arr = reactive({
  item:[1,2,3,4]
})
const changeArr = ()=>{
  arr.item = [...arr.item,5,6,7,8]
}
const render = ()=>{
  return arr.item.map((item)=>{
    return `<div>${item}</div>`
  }).join('')
}
</script>

<template>
  <!-- <div @click="changeArr">{{ arr.item }}</div>
  <div>{{ state }}</div>
  <div>{{ shallowValue }}</div>
  <button @click="shallowValue.count++">asdad</button>
  <el-row style="width: 100%;height: 100px;" justify="space-around">
    <el-col class="hidden-sm-and-up" :span="12" style="border: 1px solid red;">
      <div class="grid-content ep-bg-purple" />
    </el-col>
    <el-col :span="18" style="border: 1px solid red;">
      <div class="grid-content ep-bg-purple-light" />
    </el-col>
  </el-row> -->
  <!-- <el-row style="width: 100%;">
    <el-col :span="12">
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <el-icon :size="20" :color="'green'">
            <ElemeFilled />
          </el-icon>
          <div class="radius custom-button" :style="{
            borderRadius: `var(--el-border-radius-round)`,
            width: `100px`,
            height: `100px`,
            backgroundColor: `rgb(236, 245, 255)`,
            boxShadow: `var(--el-box-shadow-dark)`,
          }" />
        </el-main>
      </el-container>
    </el-col>
  </el-row>
  <Test_HelloWorld></Test_HelloWorld> -->
  <!-- <HelloWorld msg="Welcome to Vue 3 + Vite" />
  
  <icon /> -->
      <TableComponent /> 
      <svg width="200" height="200" viewBox="0 0 100 100">
          <stroke
            :animationDuration="3000"
            strokeColor="red"
          />
        </svg>
        <LoginPage />
  <!-- <el-button type="primary" :loading-icon="Eleme" loading>Loading</el-button> -->
</template>

<style lang="scss" scoped>
.hidden-sm-and-up {
  .grid-content {}

  .ep-bg-purple {}
}

.grid-content {}

.ep-bg-purple-light {}

.radius {}

.custom-button {
  outline: none
}

img {
  width: 200px;
  height: 200px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
