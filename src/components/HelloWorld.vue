<script setup>
/**
 * 导入 Vue 的 ref 函数，用于创建响应式变量
 * 导入 getCurrentInstance 函数，用于获取当前组件实例
 */
/**
 * 导入 Element Plus 的 dayjs 函数，用于日期处理
 */
import { dayjs } from 'element-plus';
import 'dayjs/locale/zh-cn'; // 导入本地化语言
import 'dayjs/locale/en'; // 导入本地化语言
import 'dayjs/locale/ko'; // 导入本地化语言
import { useMainStore } from '@/stores';
import { set } from 'xe-utils';
import { de } from 'element-plus/es/locales.mjs';
import testCom from './testCom.vue';
import { useMouse } from '../utils/mouse';
const { mouse } = useMouse(useTemplateRef('helloWorld'));
import { storeCount,setCount } from '../utils/store.js'

const [ ct,sct ] = setCount()


const { x, y } = toRefs(mouse)
const store = useMainStore();
store.increment();
console.log('store', store);
defineProps({
  msg: String,
});
const count = ref(0);
const { stop, resume, pause } = watch(
  () => store.count,
  (newVal) => {
    console.log('store.count changed:', newVal);
  }
);

const obj111 = reactive({
  count: 0,
  nested: {
    value: 111
  }
});

// 修复 watch 对象的错误使用
watch(
  () => obj111.count,
  (newVal, oldVal) => {
    console.log('Count changed:', newVal, oldVal);
  }
);

watchPostEffect(() => {
  console.log('这是在 DOM 更新之后运行的.');
});
//尽量少用 响应式如果不断变化 会不断触发
watchSyncEffect(() => {
  console.log('这会在响应式状态变化之后、DOM 更新之前同步运行.');
});
watchEffect((a) => {

  const timer = setTimeout(() => {


    console.log('Count changed to:', count.value);
  }, 1000);
  //清理函数 在下一次副作用运行之前或组件卸载时调用
  console.log(count.value)

  a(() => {
    console.log('timer', timer)

    clearTimeout(timer);
  });

});
const name = ref('Vue.js')

function greet(a, event) {
  console.log(`Hello ${name.value}!`)
  // `event` 是 DOM 原生事件
  if (event) {
    console.log(event?.target?.tagName)
  }
}
//防抖
const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};
//节流
const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    console.log("🚀 ~ throttle ~ args:", args)
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
function run(...a) {
  console.log('run', a);
}
const handle = throttle(run, 2000);
handle('1111')
//对象深拷贝
const deepClone = (value) => {
  if (!value || typeof value !== 'object') {
    return value;
  }
  let map = new Map()

  function _deepClone(value) {
    if (map.has(value)) {
      return map.get(value)
    }
    let result = Array.isArray(value) ? [] : {}
    map.set(value, result)
    for (const key in value) {
      result[key] = typeof value[key] === 'object' ? _deepClone(value[key]) : value[key];
    }
    return result
  }
  return _deepClone(value)
}
for (const item of ['a', 'b']) {
  console.log("🚀 ~ item:", item)
  // console.log(item)
}
const likes = ref(10);
const callback = (...payload) => {
  console.log('Event received with payload:', payload);
};
const m = reactive({
  value: 0,
  key: 'key'
});
const updata = (val) => {
  // m.value = val
  console.log('Updata event received with value:', val);
};
const location = ref('North Pole')

function updateLocation(val) {
  location.value = val
}

provide('location', {
  location,
  updateLocation
})
</script>

<template>
  <div ref="helloWorld" class="flex flex-col items-center" style="background-color: aqua">
    <div>From A: {{ ct }}</div>
    
    <div>{{ x }} - {{ y }}</div>

    <testCom id="custom-layout" :style="{ width: '300px', background: 'red', color: '#000', padding: '10px' }"
      @click="run" v-model="m" @some-event="callback" :likes="likes" :greeting-message="'hello'" :title="'yyb'" />
    <div class="container">
      <el-button @click="() => { likes++; console.log(likes) }">{{ likes }}</el-button>
      <el-button @click="stop">停止</el-button>
      <el-button @click="resume">恢复监听</el-button>
      <el-button @click="pause">暂停监听</el-button>
      <h1>{{ msg }}</h1>
      <div>{{ dayjs.months() }}</div>
      <div class="card">
        <button type="button" @click="count++">count is {{ count }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
}
</style>
