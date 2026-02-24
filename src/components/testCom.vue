<script setup lang="ts">
import { use } from 'vxe-pc-ui';
import type { Ref } from 'vue'
import { useMouse } from '../utils/mouse';
import { useFetch } from '../utils/fetch.js'
import { onRenderTracked, onRenderTriggered } from 'vue'
import { storeCount,setCount } from '../utils/store.js'

const [ ct, sct  ] = setCount();
console.log("🚀 ~ sct:", sct)


const url = ref('/initial-url')
// useState.js

function useState<T>(initialValue: T): [Ref<T>, (newValue: T | ((prev: T) => T)) => void] {
  const state = shallowRef(initialValue);
  const setState = (newValue: T | ((prev: T) => T)) => {
    if (typeof newValue === 'function') {
      state.value = (newValue as (prev: T) => T)(state.value);
    } else {
      state.value = newValue;
    }
  };
  return [state, setState];
}
const { data, error } = useFetch(url)
const data1 = ref(1) // 确保初始值为数字
const [tol, set] = useState([
  { id: 1, text: '学习 React' },  // 数组第一个元素
  { id: 2, text: '写一篇博客' }   // 数组第二个元素
]);
set((prev) => [ { id: 3, text: '新任务' }]);
console.log("🚀 ~ tol:", tol)

watchEffect(async () => {

    
    console.log('Fetched data:', data1.value)
    // data1.value = data1.value + 1
    await nextTick()
    // data1.value = data1.value + 1
})
// 这将会重新触发 fetch
setInterval(() => {
    url.value = '/new-url'
    // data1.value = data1.value + 1
    // console.log('URL changed to:', url.value)
}, 1000);

import type { HTMLAttributes } from 'vue';
interface MyAttrs {
    id?: string;
    [key: string]: unknown; // 允许其他动态属性
}
const { mouse } = useMouse(useTemplateRef('test'));


const attrs = useAttrs() as MyAttrs;
const mainId = computed(() => attrs.id);
// const attrs = useAttrs() as HTMLAttributes  & { [key: string]: unknown };
const ccc = ref({ a: 1 })

watchEffect(() => {
    console.log('watchEffect:', ccc.value);

    ccc.value = { a: 1 }
});
// // 定义 props
// const {title,likes} = defineProps({
//   title: {
//     type: Object,
//     default: () => ({ key: 'value' }),
//   },
//   likes: {
//     type: Number,
//     default: 1,
//   },
// });

// // 创建一个本地响应式变量来存储 `likes`
// const localLikes = ref(likes);

// watchEffect(() => {

//   console.log('props.likes:', likes);
//   console.log('localLikes.value:', localLikes.value);
// });

const add = () => {
    //   localLikes.value++;


    console.log('normal', normal.value);
    console.log('likes', likes);
    // console.log('labels',title);
};
const normal = computed(() => {

    return likes + 10;
});

interface Props {
    msg?: string
    labels?: string[],
    title?: string,
    likes: number,
    greetingMessage: string
}

// const { msg = 'hello', labels = ['one', 'two'] } = defineProps<Props>()
//     interface Props {
//   msg?: string
//   labels?: string[]
// }
const aaaa = defineEmits<{
    (a: 'someEvent', ...id: number[]): void,
    (b: 'update:modelValue', val: number): void
}>()
const { msg = '222', labels, title, likes } = defineProps<Props>()

const model = defineModel({ type: Object, default: '初始值' })
const update = (e) => {
    // model.value = model.value + ' updated'
    model.value.value += 1;
    console.log('model value updated to:', model.value?.value);
}
function run(a) {
    console.log('子组件run');
    console.log(listeners);
    console.log('attrs', attrs);
    if (attrs.onClick) {
        // 同时传递自定义数据和事件对象
        let fn = (attrs.onClick as (data: string, ...arg: any) => void)
        fn('自定义数据', 1, 2, '33')
    }
}
defineOptions({
    inheritAttrs: true,
})
// 分离属性（非事件）
const attributes = computed(() => {
    const result = {}
    for (const key in attrs) {
        // 排除事件监听器（onXxx 格式且是函数）
        if (!key.startsWith('on') || typeof attrs[key] !== 'function') {
            result[key] = attrs[key]
        }
    }
    console.log("🚀 ~ attributes:", result)
    return result
})

// 分离事件监听器
const listeners = computed(() => {
    const result = {}
    for (const key in attrs) {
        // console.log("🚀 ~ attrs:", attrs)
        // 只包含事件监听器（onXxx 格式且是函数）
        if (key.startsWith('on') && typeof attrs[key] === 'function') {
            const eventName = key.slice(2).toLowerCase() // 移除 'on' 前缀
            result[eventName] = attrs[key]
        }
    }
    console.log("🚀 ~ listeners:", result)
    return result
})



// <BaseLayout> 渲染插槽内容到对应位置
function BaseLayout(slots) {
    return `<div class="container">
      <header>${slots.header}</header>
      <main>${slots.default}</main>
      <footer>${slots.footer}</footer>
    </div>`

}
const renderedDom = BaseLayout({
    header: `<h1>Header Content</h1>`,
    default: `<p>Main Content</p>`,
    footer: `<small>Footer Content</small>`
})

const referenceNode = useTemplateRef('content')
onMounted(() => {
    if (referenceNode.value) {
        console.log("🚀 ~ referenceNode:", referenceNode)
        const newElement = document.createElement('p');
        newElement.style.backgroundColor = 'red';
        newElement.innerHTML = renderedDom
        console.log("🚀 ~ newElement:", newElement)
        referenceNode.value.appendChild(newElement)
    }
})
const { location, updateLocation } = inject<{ location: string; updateLocation: (arg: any) => void }>('location', {
    location: 'Default Location',
    updateLocation: () => { }
}, true)
let sym = {},
b = Symbol('123'),
c = Symbol('123')
sym['b'] = 'b'
sym['c'] = 'c'
console.log("🚀 ~ sym:", sym)
</script>

<template>
    <div ref="test">
        <div @click="sct">From A: {{ ct }}</div>
        <header>111</header>
        <div>{{ mouse.x }} - {{ mouse.y }}</div>
        <main :id="mainId">222</main>
        <footer>223332</footer>
        <button @click="updateLocation(111)">{{ location }}</button>
        <div class="content" ref="content">

            <div> attributes:{{ attributes }}</div>
            <div> attrs:{{ attrs }}</div>
            <div> useAttrs:{{ Object.keys(listeners) }}</div>
            <el-button @click="update">{{ '跟父组件的v-model绑定: ' + model }}</el-button>
            <h2>Test Component</h2>
            <p>msg: {{ msg }}</p>
            <p>likes: {{ likes }}</p>
            <p>title: {{ title }}</p>
            <p>greetingMessage: {{ greetingMessage }}</p>
            <button @click="aaaa('someEvent', 1, 2, 3)">Click Me</button>
            <!-- <button @click="aaaa('someEvent',likes,'yy')">Click Me</button> -->
        </div>
    </div>
</template>