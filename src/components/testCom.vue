<script setup lang="ts">
import { ref, shallowRef, computed, nextTick, onMounted, onUnmounted, watch, watchEffect, inject, useAttrs, Ref } from 'vue'
import { useMouse } from '../utils/mouse'
import { useFetch } from '../utils/fetch'
import { storeCount, setCount } from '../utils/store'

// 示例：store 使用
const [ct, sct] = setCount()
console.log('store count ref:', ct, 'setter:', sct)

// 小型 useState 实现（保持原意）
// function useState<T>(initialValue: T): [Ref<T>, (newValue: T | ((prev: T) => T)) => void] {
// 	const state = shallowRef(initialValue) as Ref<T>
// 	const setState = (newValue: T | ((prev: T) => T)) => {
// 		if (typeof newValue === 'function') {
// 			state.value = (newValue as (prev: T) => T)(state.value)
// 		} else {
// 			state.value = newValue
// 		}
// 	}
// 	return [state, setState] as const
// }

// fetch 示例：使用新增的 useFetch（支持传入 ref URL）
const url = ref('/initial-url')
const { data, error } = useFetch(url)
const data1 = ref<number>(1)

// const [tol, set] = useState([
// 	{ id: 1, text: '学习 React' },
// 	{ id: 2, text: '写一篇博客' }
// ])
// set(() => [{ id: 3, text: '新任务' }])
// console.log('tol:', tol)

// 周期性改变 URL，触发 useFetch
setInterval(() => {
	url.value = '/new-url'
}, 1000)

watchEffect(async () => {
	console.log('Fetched data (data1 placeholder):', data1.value)
	await nextTick()
})

// Props / Emits
interface Props {
	msg?: string
	labels?: string[]
	title?: string
	likes: number
	greetingMessage: string
	modelValue?: number
}
const props = defineProps<Props>()
const emit = defineEmits<{
	(e: 'someEvent', ...id: number[]): void
	(e: 'update:modelValue', val: number): void
}>()

// local model 支持 v-model: 从 props.modelValue 同步并在 update 时 emit
const model = ref<number>(props.modelValue ?? 0)
watch(() => props.modelValue, (v) => {
	if (typeof v === 'number') model.value = v
})

const update = () => {
	model.value = (model.value ?? 0) + 1
	emit('update:modelValue', model.value)
	console.log('model value updated to:', model.value)
}

// template refs（替代原先的 useTemplateRef）
const test = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)

// useMouse：传入元素 ref（如果为空则监听 window）
const { mouse } = useMouse(test)

// useAttrs 用法：区分非事件属性与事件监听器
type MyAttrs = { id?: string; [key: string]: any }
const attrs = useAttrs() as MyAttrs
const mainId = computed(() => attrs.id)

const attributes = computed(() => {
	const result: Record<string, unknown> = {}
	for (const key in attrs) {
		if (!key.startsWith('on') || typeof (attrs as any)[key] !== 'function') {
			result[key] = attrs[key]
		}
	}
	return result
})

const listeners = computed(() => {
	const result: Record<string, Function> = {}
	for (const key in attrs) {
		if (key.startsWith('on') && typeof (attrs as any)[key] === 'function') {
			const eventName = key.slice(2).toLowerCase()
			result[eventName] = (attrs as any)[key]
		}
	}
	return result
})

onMounted(() => {
	// 向 content 插入生成的 DOM（示例）
	if (content.value) {
		const div = document.createElement('div')
		div.style.backgroundColor = 'red'
		div.innerHTML = `<div><h1>Header Content</h1><p>Main Content</p></div>`
		content.value.appendChild(div)
	}
})

// 注入示例（防止未注入时报错，提供默认）
const injected = inject<{ location: string; updateLocation: (arg: any) => void }>(
	'location',
	{ location: 'Default Location', updateLocation: () => {} },
	true
)
const location = injected.location
const updateLocation = injected.updateLocation

// 清理（如果需要）
onUnmounted(() => {
	// ...existing cleanup...
})

// 其它小调试变量（保留原意）
const ccc = ref({ a: 1 })
watchEffect(() => {
	ccc.value = { a: 1 }
})
</script>

<template>
    <div ref="test">
        
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
            
            <!-- <button @click="aaaa('someEvent',likes,'yy')">Click Me</button> -->
        </div>
    </div>
</template>