import { ref } from 'vue'

const storeCount = ref<number>(0)

function setCount() {
	const setter = (val: number) => {
		storeCount.value = val
	}
	return [storeCount, setter] as const
}

export { storeCount, setCount }